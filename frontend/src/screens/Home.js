import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../components/Header'
import SignUp from '../components/SignUp'

const Home = ({ history }) => {
  const [showSignUp, setShowSignUp] = useState(false)

  const signUpHandler = () => {
    setShowSignUp(true)
  }

  return (
    <>
      <Header history={history} />
      <SignUp show={showSignUp} setShowSignUp={setShowSignUp} />
      <div className="tagline-box">
        <h1 className="tagline">
          <p>The only task tool you need for task management.</p>
          <p>
            {
              <Button
                variant="primary"
                size="sm"
                className="btn-signup mb-2 ps-3 pe-3"
                onClick={() => signUpHandler()}
              >
                Sign up
              </Button>
            }{' '}
            now and start managing!
          </p>
        </h1>
      </div>
    </>
  )
}

export default Home
