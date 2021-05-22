import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAvatar } from '../actions/userActions'
import { FOLDER_SELECTED } from '../constants/taskConstants'

const TaskMenu = ({
  setCloseTaskMenu,
  closeTaskMenu,
  setOpenTaskMenu,
  openTaskMenu,
}) => {
  const [avatar, setAvatar] = useState('')
  const { tasks, folders } = useSelector(state => state.getUserTasks)
  const { selectedFolder } = useSelector(state => state.getSelectedFolder)
  const { userInfo } = useSelector(state => state.userSignIn)

  const dispatch = useDispatch()

  const folderSelector = folder => {
    dispatch({ type: FOLDER_SELECTED, payload: folder })
  }

  getUserAvatar(userInfo)
    .then(data => {
      setAvatar(`http://localhost:5000/api/users/${userInfo.user._id}/avatar`)
    })
    .catch(error => {
      setAvatar('/default-avatar.jpg')
    })

  return (
    <>
      <Row>
        <img src={avatar} alt="avatar" className="task-menu-avatar" />
      </Row>
      <Row className="task-menu-user">
        <h5>{userInfo.user.email}</h5>
      </Row>
      <Container className="folder-scroll" fluid="true">
        {folders?.map(folder => (
          <div key={folder}>
            <Row className="folder" onClick={() => folderSelector(folder)}>
              <Col xs={3} lg={3} className="material-icons">
                &#xe2c7;
              </Col>
              <Col xs={9} lg={9}>
                <p>
                  <strong>{folder}</strong>
                </p>
              </Col>
            </Row>
            {selectedFolder === folder &&
              tasks.map(
                task =>
                  task.folder === folder && (
                    <Row key={task._id} className="folder-task">
                      <Col xs={4} className="material-icons" lg={4}>
                        &#xef4a;
                      </Col>
                      <Col xs={8} lg={8} style={{ paddingLeft: '0' }}>
                        <p>{task.name}</p>
                      </Col>
                    </Row>
                  )
              )}
          </div>
        ))}
      </Container>
      <span
        className={`material-icons task-menu-close-icon ${closeTaskMenu}`}
        onClick={() => {
          setCloseTaskMenu('no-display')
          setOpenTaskMenu('')
        }}
      >
        &#xe5cd;
      </span>
    </>
  )
}

export default TaskMenu
