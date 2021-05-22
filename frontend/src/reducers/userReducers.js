import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_SIGNOUT_SUCCESS,
} from '../constants/userConstants'

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, userInfo: {} }
    case USER_SIGNIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_SIGNIN_FAIL:
      return { loading: false, success: false, error: action.payload }
    case USER_SIGNOUT_SUCCESS:
      return {}
    default:
      return state
  }
}

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: { user: action.payload },
      }
    case USER_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}
