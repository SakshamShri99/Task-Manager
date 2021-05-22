import axios from 'axios'
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_SIGNOUT_SUCCESS,
} from '../constants/userConstants'

export const createUser = user => async dispatch => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/users', user, config)

    localStorage.setItem('userInfo', JSON.stringify(data))

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const signInUser = user => async dispatch => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/users/login', user, config)

    localStorage.setItem('userInfo', JSON.stringify(data))

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const signOutUser = () => async (dispatch, getState) => {
  const {
    userSignIn: { userInfo = {} },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  await axios.post('/api/users/logout', {}, config)

  localStorage.removeItem('userInfo')
  localStorage.removeItem('tasks')
  localStorage.removeItem('folders')

  dispatch({ type: USER_SIGNOUT_SUCCESS })

  return
}

export const signOutAllUser = () => async (dispatch, getState) => {
  const {
    userSignIn: { userInfo = {} },
  } = getState()

  console.log(userInfo)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  await axios.post('/api/users/logoutAll', {}, config)

  localStorage.removeItem('userInfo')
  localStorage.removeItem('tasks')
  localStorage.removeItem('folders')

  dispatch({ type: USER_SIGNOUT_SUCCESS })

  return
}

export const updateUser = userUpdate => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })

    const {
      userSignIn: { userInfo = {} },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.patch('/api/users/me', userUpdate, config)

    localStorage.setItem(
      'userInfo',
      JSON.stringify({ user: data, token: userInfo.token })
    )

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = () => async (dispatch, getState) => {
  const {
    userSignIn: { userInfo = {} },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  await axios.delete('/api/users/me', config)

  localStorage.removeItem('userInfo')
  localStorage.removeItem('tasks')
  localStorage.removeItem('folders')

  dispatch({ type: USER_SIGNOUT_SUCCESS })

  return
}

export const uploadAvatar = async (userInfo, avatar) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const { data } = await axios.post('/api/users/me/avatar', avatar, config)

  return data
}

export const getUserAvatar = async userInfo => {
  const config = {
    headers: {
      'Content-Type': 'image/png',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const { data } = await axios.get(
    `/api/users/${userInfo.user._id}/avatar`,
    config
  )

  return data
}

export const deleteUserAvatar = async userInfo => {
  const config = {
    headers: {
      'Content-Type': 'multipart/formdata',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const { data } = await axios.delete(`/api/users/me/avatar`, config)

  return data
}
