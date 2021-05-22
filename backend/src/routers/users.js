const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
const { sendWelcomeEmail, sendDeleteEmail } = require('../emails/account.js')

const router = new express.Router()

router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    await sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()

    res.send('Logged Out Successfully')
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send('Logout out of all sessions successfully')
  } catch (e) {
    res.satus(500).send()
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'isAdmin']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })

  if (updates.currentPassword) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.currentPassword
      )
    } catch (e) {
      return res.status(400).send({ error: 'Wrong Current Password' })
    }
  }

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update]
    })
    await req.user.save()

    if (!req.user) return res.status(404).send()
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    await sendDeleteEmail(req.user.email, req.user.name)
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error('PLease upload an image'))

    cb(undefined, true)
  },
})

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send('Profile Picture Uploaded Success')
  },
  (error, req, res, next) => {
    console.log(error)
    res.status(400).send()
  }
)

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send('Profile Pic Deleted')
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }

    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router
