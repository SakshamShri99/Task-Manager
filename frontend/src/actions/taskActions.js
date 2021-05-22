import axios from 'axios'
import {
  ADD_TASK_FAIL,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  GET_USER_TASKS_FAIL,
  GET_USER_TASKS_REQUEST,
  GET_USER_TASKS_SUCCESS,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  FOLDER_SELECTED,
} from '../constants/taskConstants'

export const createTask = task => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_TASK_REQUEST })

    const {
      userSignIn: { userInfo = {} },
      getUserTasks: { tasks, folders },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/tasks', task, config)

    tasks.push(data)
    if (!folders.includes(task.folder)) folders.push(data.folder)

    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('folders', JSON.stringify(folders))

    dispatch({ type: ADD_TASK_SUCCESS, payload: data })
    dispatch({ type: FOLDER_SELECTED, payload: data.folder })
  } catch (error) {
    dispatch({ type: ADD_TASK_FAIL, payload: error })
  }
}

export const getUserTasks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_TASKS_REQUEST })

    const {
      userSignIn: { userInfo = {} },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/tasks', config)

    const folders = []
    data.forEach(task => {
      if (!folders.includes(task.folder)) folders.push(task.folder)
    })

    localStorage.setItem('tasks', JSON.stringify(data))
    localStorage.setItem('folders', JSON.stringify(folders))

    dispatch({ type: GET_USER_TASKS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_USER_TASKS_FAIL, payload: error })
  }
}

export const updateTask = (taskId, task) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_TASK_REQUEST })

    const {
      userSignIn: { userInfo = {} },
      getUserTasks: { tasks, folders },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(`/api/tasks/${taskId}`, task, config)

    tasks.forEach((task, index) => {
      if (task._id === data._id) tasks[index] = data
    })

    if (!folders.includes(task.folder)) folders.push(data.folder)

    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('folders', JSON.stringify(folders))

    dispatch({ type: UPDATE_TASK_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: UPDATE_TASK_FAIL, payload: error })
  }
}

export const deleteTask =
  (taskId, taskFolder) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_TASK_REQUEST })

      const {
        userSignIn: { userInfo = {} },
        getUserTasks: { tasks },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.delete(`/api/tasks/${taskId}`, config)

      const newTasks = tasks.filter(task => task._id !== data._id)

      const folders = []
      newTasks.forEach(task => {
        if (!folders.includes(task.folder)) folders.push(task.folder)
      })

      localStorage.setItem('tasks', JSON.stringify(newTasks))
      localStorage.setItem('folders', JSON.stringify(folders))

      dispatch({ type: DELETE_TASK_SUCCESS, payload: data })
      if (!folders.includes(data.folder))
        dispatch({ type: FOLDER_SELECTED, payload: folders[0] })
    } catch (error) {
      dispatch({ type: DELETE_TASK_FAIL, payload: error })
    }
  }
