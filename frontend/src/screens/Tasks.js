import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserTasks } from '../actions/taskActions'
import Header from '../components/Header'
import TaskList from '../components/TaskList'
import TaskMenu from '../components/TaskMenu'

const Tasks = ({ history }) => {
  const [openTaskMenu, setOpenTaskMenu] = useState('')
  const [closeTaskMenu, setCloseTaskMenu] = useState('no-display')

  const { success: taskAdded } = useSelector(state => state.addTask)
  const { success: taskUpdated } = useSelector(state => state.updateTask)
  const { success: taskDeleted } = useSelector(state => state.deleteTask)

  const dispatch = useDispatch()
  dispatch(getUserTasks())

  useEffect(() => {
    if (taskAdded || taskUpdated || taskDeleted) dispatch(getUserTasks())
  }, [taskAdded, taskDeleted, taskUpdated, dispatch])

  return (
    <main style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Header bg="primary" history={history} />
      <Container fluid className="task-page">
        <Row style={{ minHeight: '92.5vh' }}>
          <Col className={`task-menu ${closeTaskMenu}`} xs={6} lg={2}>
            <TaskMenu
              openTaskMenu={openTaskMenu}
              setOpenTaskMenu={setOpenTaskMenu}
              closeTaskMenu={closeTaskMenu}
              setCloseTaskMenu={setCloseTaskMenu}
            />
          </Col>
          <Col className="task-list" xs={12} lg={12}>
            <TaskList
              openTaskMenu={openTaskMenu}
              setOpenTaskMenu={setOpenTaskMenu}
              closeTaskMenu={closeTaskMenu}
              setCloseTaskMenu={setCloseTaskMenu}
            />
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Tasks
