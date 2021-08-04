import * as React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap'

import registrationActions from './actions'

import { DispatchLoginContext, LoginContext } from '../../LoginProvider'

const DeviseRegistrationsNew:React.FC = () => {
  const { registering, errors } = React.useContext(LoginContext)
  const dispatch = React.useContext(DispatchLoginContext)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event) {
    console.log(email)
    console.log(password)

    setSubmitted(true)

    if (email && password) {
      registrationActions.register({ dispatch, user: { email, password } })
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Register</h2>
        <div>
          <Form.Group className={classnames({ 'has-error': submitted && (!email || (errors && errors.email))})}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" id="user_email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {submitted && !email &&
              <div className="help-block">Email is required</div>
            }
            {submitted && errors && errors.email &&
              <div className="help-block">{errors.email}</div>
            }
          </Form.Group>
          <Form.Group className={classnames({ 'has-error': (submitted && (!password || (errors && errors.password))) })}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" id="user_password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
            {submitted && errors && errors.password &&
              <div className="help-block">{errors.password}</div>
            }
          </Form.Group>
          <div className="form-group">
            <Button variant="primary" onClick={handleSubmit}>Register</Button>
            {registering &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/users/sign_in" className="btn btn-link">Cancel</Link>
            <Link to="/users/confirmation/new" className="btn btn-link">Did not received the confirmation email?</Link>
            <Link to="/users/unlocks/new" className="btn btn-link">Did not receive unlock instructions?</Link>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default DeviseRegistrationsNew
