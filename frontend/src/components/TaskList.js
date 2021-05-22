import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../actions/taskActions'
import AddTask from './AddTask'
import EditTask from './EditTask'

const TaskList = ({
  setCloseTaskMenu,
  closeTaskMenu,
  setOpenTaskMenu,
  openTaskMenu,
}) => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState(false)
  const [taskId, setTaskId] = useState('')

  const { tasks } = useSelector(state => state.getUserTasks)
  const { selectedFolder } = useSelector(state => state.getSelectedFolder)

  const dispatch = useDispatch()

  return (
    <>
      <AddTask show={showAddTask} setShowAddTask={setShowAddTask} />
      <EditTask
        show={showEditTask}
        setShowEditTask={setShowEditTask}
        taskId={taskId}
      />
      {tasks && tasks.length === 0 && (
        <div className="no-tasks">
          {' '}
          <h1>No Tasks Yet!</h1>
          <img alt="sad" src="/sad.svg" />
        </div>
      )}
      {tasks &&
        tasks.map(
          task =>
            task.folder === selectedFolder && (
              <Row className="user-task" key={task._id}>
                <span style={{ width: '95%', paddingRight: '0' }}>
                  <h5>
                    <strong>{task.name}</strong>
                  </h5>
                </span>
                <span
                  className="material-icons edit-task-icon"
                  onClick={e => {
                    setShowEditTask(true)
                    setTaskId(task._id)
                  }}
                >
                  &#xe745;
                </span>
                <h6
                  style={{ width: '50%' }}
                >{`Last updated: ${task.updatedAt}`}</h6>
                <h6
                  style={{ width: '45%', textAlign: 'right' }}
                >{`Created: ${task.createdAt}`}</h6>
                <p
                  style={{ width: '95%', paddingRight: '0', marginBottom: '0' }}
                >
                  {task.description}
                </p>
                <span
                  className="material-icons delete-task-icon"
                  onClick={e => {
                    dispatch(deleteTask(task._id, task.folder))
                  }}
                >
                  &#xe872;
                </span>
              </Row>
            )
        )}
      <span
        className="material-icons add-task-icon"
        onClick={e => {
          setShowAddTask(true)
        }}
      >
        &#xe147;
      </span>
      <span
        className={`material-icons task-menu-icon ${openTaskMenu}`}
        onClick={() => {
          setCloseTaskMenu('')
          setOpenTaskMenu('no-display')
        }}
      >
        &#xe5d2;
      </span>
    </>
  )
}

export default TaskList
