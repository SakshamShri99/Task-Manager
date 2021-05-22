import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Container, Modal, Row } from 'react-bootstrap'
import { createTask } from '../actions/taskActions'
import Message from '../components/Message'

const AddTask = ({ show, setShowAddTask }) => {
  const [error, setError] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskFolder, setTaskFolder] = useState('')

  const { selectedFolder } = useSelector(state => state.getSelectedFolder)

  useEffect(() => {
    if (selectedFolder) setTaskFolder(selectedFolder)
  }, [selectedFolder])

  const dispatch = useDispatch()

  const addTaskHandler = e => {
    e.preventDefault()
    if (!taskName) {
      setError('Email is required')
      return
    }
    if (!taskDesc) {
      setError('Task is required')
      return
    }
    if (!taskFolder) {
      setError('Folder is required')
      return
    }
    dispatch(
      createTask({ name: taskName, description: taskDesc, folder: taskFolder })
    )
    setShowAddTask(false)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShowAddTask(false)}
        size="lg"
        centered
      >
        <Modal.Body>
          {error && <Message variant="danger">error</Message>}
          <Container className="add-task mb-4">
            <Row className="justify-content-md-center">
              <Form className="home-form" onSubmit={addTaskHandler}>
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
                  Add Task
                </Button>
              </Form>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddTask
