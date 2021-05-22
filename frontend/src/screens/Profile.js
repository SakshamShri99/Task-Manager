import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {
  deleteUser,
  deleteUserAvatar,
  getUserAvatar,
  updateUser,
  uploadAvatar,
} from '../actions/userActions'
import Message from '../components/Message'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'

const Profile = ({ history }) => {
  const { userInfo } = useSelector(state => state.userSignIn)
  const { user } = userInfo

  const [firstName, setFirstName] = useState(user.name.split(' ')[0])
  const [lastName, setLastName] = useState(user.name.split(' ')[1])
  const [email, setEmail] = useState(user.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [cnfPassword, setCnfPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [avatar, setAvatar] = useState('')

  const { error: updateError, success: updateSuccess } = useSelector(
    state => state.userUpdate
  )

  const dispatch = useDispatch()

  const formData = new FormData()

  getUserAvatar(userInfo)
    .then(data => {
      setAvatar(`http://localhost:5000/api/users/${userInfo.user._id}/avatar`)
    })
    .catch(error => {
      setAvatar('/default-avatar.jpg')
    })

  const selectAvatar = e => {
    e.preventDefault()
    formData.append('avatar', e.target.files[0])
  }

  const uploadAvatarHandler = e => {
    e.preventDefault()
    uploadAvatar(userInfo, formData).then(data => setMessage(data))
  }

  const deleteAvatarHandler = e => {
    e.preventDefault()
    deleteUserAvatar(userInfo).then(data => setMessage(data))
  }

  const submitUpdateHandler = e => {
    e.preventDefault()
    let user = {
      name: firstName + ' ' + lastName,
      email,
    }
    if (password && !currentPassword) {
      setError('Enter current password')
      return
    }
    if (currentPassword && password !== cnfPassword) {
      setError('Passwords do not match')
      return
    }
    if (currentPassword && password === cnfPassword) {
      user = {
        ...user,
        currentPassword,
        password,
      }
    }
    dispatch(updateUser(user))
  }

  const deleteProfileHandler = e => {
    e.preventDefault()
    dispatch(deleteUser())
    history.push('/')
  }

  useEffect(() => {
    if (updateSuccess) {
      setMessage('Profile updated sucessfully')
    }
    getUserAvatar(userInfo)
      .then(data => {
        setAvatar(`http://localhost:5000/api/users/${userInfo.user._id}/avatar`)
      })
      .catch(error => {
        setAvatar('/default-avatar.jpg')
      })
  }, [updateSuccess, userInfo, history])

  return (
    <main style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Header bg="primary" history={history} />
      <Container className="profile-page mb-4">
        <h1 id="page-heading">User Profile</h1>
        <Row className="justify-content-md-center">
          <Col xs="12" lg="4" style={{ marginRight: '5rem' }}>
            <Form className="home-form" onSubmit={uploadAvatarHandler}>
              <Form.Group>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={avatar}
                    alt="avatar"
                    className="avatar"
                    style={{
                      borderRadius: '100%',
                      maxWidth: '84%',
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <label htmlFor="formFile" className="form-label">
                  Profile Picture
                </label>
                <Row>
                  <Col lg={10}>
                    <input
                      className="form-control"
                      accept="image"
                      name="avatar"
                      type="file"
                      id="formFile"
                      onChange={selectAvatar}
                    />
                  </Col>
                  <Col lg={2} style={{ paddingLeft: '0' }}>
                    <Button
                      className="material-icons delete-avatar-icon"
                      onClick={deleteAvatarHandler}
                    >
                      &#xe872;
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <Button type="submit" variant="primary">
                Upload Picture
              </Button>
            </Form>
          </Col>
          <Col xs="12" lg="4" style={{ marginLeft: '5rem' }}>
            {updateSuccess && <Message variant="success">{message}</Message>}
            {updateError && <Message variant="danger">{updateError}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <Form className="home-form" onSubmit={submitUpdateHandler}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      as="input"
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      as="input"
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  as="input"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  as="input"
                  type="password"
                  placeholder="Enter Current Password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  as="input"
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  as="input"
                  type="password"
                  placeholder="Confirm Password"
                  value={cnfPassword}
                  onChange={e => setCnfPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                style={{
                  width: '40%',
                  padding: '0.5rem 0rem',
                  margin: '2rem 1.2rem 0 1.2rem',
                  display: 'inline',
                }}
              >
                Update Profile
              </Button>
              <Button
                onClick={deleteProfileHandler}
                variant="primary"
                style={{
                  width: '40%',
                  padding: '0.5rem 0rem',
                  margin: '2rem 1.2rem 0 1.2rem',
                  display: 'inline',
                }}
              >
                Delete Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Profile
