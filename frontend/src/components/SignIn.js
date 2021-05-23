import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Container, Modal } from 'react-bootstrap';
import { signInUser } from '../actions/userActions';
import Message from './Message';

const SignIn = ({ show, setShowSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const { error: loginError } = useSelector((state) => state.userSignIn);

  const submitSignInHandler = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    dispatch(signInUser({ email, password }));
    if (!loginError) setShowSignIn(false);
  };

  return (
    <Container style={{ width: '0', padding: '0', margin: '0' }}>
      <Modal
        id="modal-signin"
        show={show}
        onHide={() => setShowSignIn(false)}
        size="sm"
      >
        <Modal.Body>
          {error && <Message variant="danger">{error}</Message>}
          {loginError && <Message variant="danger">{loginError}</Message>}
          <Form onSubmit={submitSignInHandler}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                as="input"
                type="email"
                placeholder="Enter Email"
                size="sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ marginTop: '13px' }}>Password</Form.Label>
              <Form.Control
                as="input"
                type="password"
                placeholder="Enter Password"
                size="sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SignIn;
