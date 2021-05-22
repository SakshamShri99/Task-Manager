import {
  ADD_TASK_FAIL,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  FOLDER_SELECTED,
  GET_USER_TASKS_FAIL,
  GET_USER_TASKS_REQUEST,
  GET_USER_TASKS_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from '../constants/taskConstants'

export const addTaskReducer = (state = { tasks: [], folders: [] }, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return { loading: true, ...state }
    case ADD_TASK_SUCCESS:
      return {
        loading: false,
        success: true,
        task: action.payload,
      }
    case ADD_TASK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getUserTasksReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_TASKS_REQUEST:
      return { loading: true, ...state }
    case GET_USER_TASKS_SUCCESS:
      const folders = []
      action.payload.forEach(task => {
        if (!folders.includes(task.folder)) folders.push(task.folder)
      })
      return {
        loading: false,
        success: true,
        tasks: action.payload,
        folders,
      }
    case GET_USER_TASKS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getSelectedFolderReducer = (state = {}, action) => {
  if (action.type === FOLDER_SELECTED) {
    return { selectedFolder: action.payload }
  }
  return state
}

export const updateTaskReducer = (
  state = { tasks: [], folders: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return { loading: true, ...state }
    case UPDATE_TASK_SUCCESS:
      return {
        loading: false,
        success: true,
        task: action.payload,
      }
    case UPDATE_TASK_FAIL:
      return { loading: false, error: action.payload, ...state }
    default:
      return state
  }
}

export const deleteTaskReducer = (
  state = { tasks: [], folders: [] },
  action
) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return { loading: true, ...state }
    case DELETE_TASK_SUCCESS:
      return {
        loading: false,
        success: true,
        task: action.payload,
      }
    case DELETE_TASK_FAIL:
      return { loading: false, success: false, error: action.payload, ...state }
    default:
      return state
  }
}
