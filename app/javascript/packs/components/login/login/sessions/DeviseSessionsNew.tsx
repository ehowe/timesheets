import * as React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import {
  Button,
  Col,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap'

import { DispatchLoginContext, LoginContext } from '../../LoginProvider'

import sessionActions from './actions'

const DeviseSessionsNew: React.FC = () => {
  const dispatchLogin = React.useContext(DispatchLoginContext)
  const loginState = React.useContext(LoginContext)
  const { loggingIn } = loginState

  const initState = {
    email: '',
    password: '',
    submitted: false,
  }

  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, initState)

  function handleChange(event) {
    const { name, value } = event.target

    dispatch({
      [name]: value,
    })
  }

  function handleSubmit() {
    dispatch({ submitted: true })
    const { email, password } = state
    if (email && password) {
      sessionActions.login({ email, password, dispatch: dispatchLogin })
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Login</h2>
        <div>
          <Form.Group className={classnames({ 'has-error': state.submitted && !state.email })}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" className="form-control" id="email" name="email" value={state.email} onChange={handleChange} />
            {state.submitted && !state.email &&
              <div className="help-block">Email is required</div>
            }
          </Form.Group>
          <Form.Group className={classnames({ 'has-error': state.submitted && !state.password })}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" className="form-control" id="password" name="password" value={state.password} onChange={handleChange} />
            {state.submitted && !state.password &&
              <div className="help-block">Password is required</div>
            }
          </Form.Group>
          <FormGroup>
            <Button color="primary" onClick={handleSubmit}>Login</Button>
            {loggingIn &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/users/sign_up" className="btn btn-link">Register</Link>
            <Link to="/users/password/new" className="btn btn-link">Forgot your password?</Link>
          </FormGroup>
        </div>
      </Col>
    </Row>
  )
}

export default DeviseSessionsNew
