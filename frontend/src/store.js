import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userSignInReducer, userUpdateReducer } from './reducers/userReducers'
import {
  addTaskReducer,
  deleteTaskReducer,
  getSelectedFolderReducer,
  getUserTasksReducer,
  updateTaskReducer,
} from './reducers/taskReducers'

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userUpdate: userUpdateReducer,
  getUserTasks: getUserTasksReducer,
  getSelectedFolder: getSelectedFolderReducer,
  addTask: addTaskReducer,
  updateTask: updateTaskReducer,
  deleteTask: deleteTaskReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {}

const tasksFromStorage = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : []

const foldersFromStorage = localStorage.getItem('folders')
  ? JSON.parse(localStorage.getItem('folders'))
  : []

const initialState = {
  userSignIn: { userInfo: userInfoFromStorage },
  getUserTasks: {
    tasks: tasksFromStorage,
    folders: foldersFromStorage,
  },
  getSelectedFolder: {
    selectedFolder: foldersFromStorage ? foldersFromStorage[0] : [],
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
