import React from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'

export const ContactUs = ({ show, setShowContactUs }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShowContactUs(false)}
        size="lg"
        centered
      >
        <Modal.Body>
          <h1 id="section-tagline">We like to hear from you!</h1>
          <Container className="signup-area mb-4">
            <Row className="justify-content-md-center">
              <Form className="home-form">
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>Name</Form.Label>
                    </Col>
                    <Col lg="7">
                      <Form.Control
                        as="input"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>Email</Form.Label>
                    </Col>
                    <Col lg="7">
                      <Form.Control
                        as="input"
                        type="email"
                        placeholder="Enter Email"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>How did you find us?</Form.Label>
                    </Col>
                    <Col lg="7">
                      <Form.Control as="select" defaultValue="Choose...">
                        <option>Social Media</option>
                        <option>Advertisement</option>
                        <option>Friends</option>
                        <option>Colleagues</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>News Letter?</Form.Label>
                    </Col>
                    <Col lg="7">
                      <Form.Check type="radio" label="Yes Please" />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>Drop us a line</Form.Label>
                    </Col>
                    <Col lg="7">
                      <Form.Control as="textarea" placeholder="Write here..." />
                    </Col>
                  </Row>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => setShowContactUs(false)}
                >
                  Send
                </Button>
              </Form>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ContactUs
