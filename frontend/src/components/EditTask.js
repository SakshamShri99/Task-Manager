import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Container, Modal, Row } from 'react-bootstrap'
import { updateTask } from '../actions/taskActions'
import Message from '../components/Message'

const EditTask = ({ show, setShowEditTask, taskId }) => {
  const [taskName, setTaskName] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskFolder, setTaskFolder] = useState('')

  const { selectedFolder } = useSelector(state => state.getSelectedFolder)
  const { tasks } = useSelector(state => state.getUserTasks)
  const { error } = useSelector(state => state.updateTask)

  useEffect(() => {
    if (selectedFolder) setTaskFolder(selectedFolder)
    tasks?.forEach(task => {
      if (task._id === taskId) {
        setTaskName(task.name)
        setTaskDesc(task.description)
      }
    })
  }, [selectedFolder, taskId, tasks])

  const dispatch = useDispatch()

  const editTaskHandler = e => {
    e.preventDefault()
    dispatch(
      updateTask(taskId, {
        name: taskName,
        description: taskDesc,
        folder: taskFolder,
      })
    )
    setShowEditTask(false)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShowEditTask(false)}
        size="lg"
        centered
      >
        <Modal.Body>
          {error && <Message variant="danger">{error.message}</Message>}
          <Container className="add-task mb-4">
            <Row className="justify-content-md-center">
              <Form className="home-form" onSubmit={editTaskHandler}>
                <Form.Group>
                  <Form.Label>Folder Name</Form.Label>
                  <Form.Control
                    as="input"
                    type="text"
                    value={taskFolder}
                    onChange={e => setTaskFolder(e.target.value)}
                    placeholder="Enter Folder Name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    as="input"
                    type="text"
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                    placeholder="Enter Task Name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>

                  <Form.Control
                    as="textarea"
                    placeholder="Write here..."
                    value={taskDesc}
                    onChange={e => setTaskDesc(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Update Task
                </Button>
              </Form>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditTask
