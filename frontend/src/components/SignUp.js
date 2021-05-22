import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import { createUser } from '../actions/userActions'
import Message from './Message'

export const SignUp = ({ show, setShowSignUp, location }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cnfPassword, setCnfPassword] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const { error: signUpError } = useSelector(state => state.userSignIn)

  const submitSignUpHandler = e => {
    e.preventDefault()
    if (password !== cnfPassword) {
      setError('Passwords do not match')
      return
    }
    const user = {
      name: firstName + ' ' + lastName,
      email,
      password,
    }
    dispatch(createUser(user))
    if (!signUpError) setShowSignUp(false)
  }

  return (
    <Modal show={show} onHide={() => setShowSignUp(false)} centered>
      <Modal.Body>
        <h1 id="section-tagline">Start Managing Right Away!</h1>
        <Container className="signup-area mb-4">
          {signUpError && <Message variant="danger">{signUpError}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <Row className="justify-content-md-center">
            <Form className="home-form" onSubmit={submitSignUpHandler}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      as="input"
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      as="input"
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  as="input"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  as="input"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  as="input"
                  type="password"
                  placeholder="Confirm Password"
                  value={cnfPassword}
                  onChange={e => setCnfPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Sign Up
              </Button>
            </Form>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default SignUp
