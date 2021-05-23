import React, { useState } from 'react';
import { Navbar, Container, Nav, Dropdown, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { signOutAllUser, signOutUser } from '../actions/userActions';
import ContactUs from './ContactUs';
import SignIn from './SignIn';

const Header = ({ bg = '', history }) => {
  const [showContactUs, setShowContactUs] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const { userInfo } = useSelector((state) => state.userSignIn);

  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOutUser());
    history.push('/');
  };

  const signOutAllHandler = () => {
    dispatch(signOutAllUser());
    history.push('/');
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <LinkContainer to="" className="me-5">
      <a
        href="/"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="me-5  active nav-link active"
      >
        {children}
      </a>
    </LinkContainer>
  ));

  return (
    <header>
      <ContactUs show={showContactUs} setShowContactUs={setShowContactUs} />
      <Navbar expand="md" variant="dark" bg={bg} sticky="top">
        <Container fluid>
          <Navbar.Brand className="ms-5 logo" style={{ fontSize: '30px' }}>
            <a href="/">
              <img
                src={`/logo${bg}.png`}
                height="70"
                className="d-inline-block align-top ps-5"
                alt="logo"
              />
            </a>
          </Navbar.Brand>
          <Navbar.Brand className="ms-2 " style={{ fontSize: '35px' }}>
            MyTask
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav as="ul" className="ms-auto">
              {bg === 'primary' && (
                <>
                  <span
                    className="material-icons"
                    style={{ marginLeft: '1.12rem' }}
                  >
                    &#xe88a;
                  </span>
                  <LinkContainer
                    to="/"
                    className="home-link"
                    style={{ marginRight: '49rem' }}
                  >
                    <Nav.Link as="a">HOME</Nav.Link>
                  </LinkContainer>
                </>
              )}
              {!userInfo?.user && (
                <>
                  <span className="material-icons">&#xea77;</span>
                  <LinkContainer
                    to="#signin"
                    onClick={() => setShowSignIn(true)}
                    className="me-5"
                  >
                    <Nav.Link as="a">SIGN IN</Nav.Link>
                  </LinkContainer>
                  <SignIn show={showSignIn} setShowSignIn={setShowSignIn} />
                </>
              )}

              {userInfo?.user && (
                <>
                  <span className="material-icons">&#xE853;</span>
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                      {userInfo.user.name.split(' ')[0].toUpperCase()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Container
                        fluid="true"
                        style={{ margin: '0', padding: '0' }}
                      >
                        <Dropdown.Item
                          onClick={() => history.push('/user/profile')}
                        >
                          <Container>
                            <Row>
                              <Col xs="2" lg="1">
                                <span className="material-icons">&#xf02e;</span>
                              </Col>
                              <Col xs="10" lg="9">
                                Profile
                              </Col>
                            </Row>
                          </Container>
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => history.push('/user/mytasks')}
                        >
                          <Container>
                            <Row>
                              <Col xs="2" lg="1">
                                <span className="material-icons">&#xe065;</span>
                              </Col>
                              <Col xs="10" lg="9">
                                My Tasks
                              </Col>
                            </Row>
                          </Container>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={signOutHandler}>
                          <Container>
                            <Row>
                              <Col xs="2" lg="1">
                                <span className="material-icons">&#xe9ba;</span>
                              </Col>
                              <Col xs="10" lg="9">
                                Sign Out
                              </Col>
                            </Row>
                          </Container>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={signOutAllHandler}>
                          <Container>
                            <Row>
                              <Col xs="2" lg="1">
                                <span className="material-icons">&#xe9ba;</span>
                              </Col>
                              <Col xs="10" lg="9">
                                Sign Out All
                              </Col>
                            </Row>
                          </Container>
                        </Dropdown.Item>
                      </Container>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}

              <span className="material-icons">&#xe0be;</span>
              <LinkContainer
                to="#contactus"
                onClick={() => setShowContactUs(true)}
                className="me-5"
              >
                <Nav.Link as="a">CONTACT US</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
