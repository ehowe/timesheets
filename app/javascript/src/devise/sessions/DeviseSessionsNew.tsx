import * as React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {
  Button,
  Col,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap"

import sessionActions from "./actions"

type PropsT = {
  dispatch: any,
  loggingIn: any,
}

const DeviseSessionsNew: React.FC<PropsT> = (props: PropsT) => {
  const { loggingIn } = props

  const initState = {
    email: "",
    password: "",
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

  function handleSubmit(event) {
    event.preventDefault()

    dispatch({ submitted: true })
    const { email, password } = state
    if (email && password) {
      props.dispatch(sessionActions.login(email, password))
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Login</h2>
        <Form name="form" onSubmit={handleSubmit}>
          <div className={"form-group" + (state.submitted && !state.email ? " has-error" : "")}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" className="form-control" id="email" name="email" value={state.email} onChange={handleChange} />
            {state.submitted && !state.email &&
              <div className="help-block">Email is required</div>
            }
          </div>
          <div className={"form-group" + (state.submitted && !state.password ? " has-error" : "")}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" className="form-control" id="password" name="password" value={state.password} onChange={handleChange} />
            {state.submitted && !state.password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <FormGroup>
            <Button color="primary">Login</Button>
            {loggingIn &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/users/sign_up" className="btn btn-link">Register</Link>
            <Link to="/users/password/new" className="btn btn-link">Forgot your password?</Link>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication
  return {
    loggingIn,
  }
}

export default connect(mapStateToProps)(DeviseSessionsNew)
