import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Col,
  Row,
} from 'react-bootstrap'

import registrationActions from './actions'

type PropsT = {
  dispatch: any,
  registering: any,
  errors: any,
}

const DeviseRegistrationsNew:React.FC<PropsT> = (props: PropsT) => {
  const { registering, errors } = props
  const initState = {
    user: {
      email: '',
      password: '',
    },
    submitted: false,
  }

  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, initState)

  function handleChange(event) {
    const { name, value } = event.target
    const { user } = state

    dispatch({
      user: {
        ...user,
        [name]: value,
      },
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    dispatch({ submitted: true })
    if (state.user.email && state.user.password) {
      props.dispatch(registrationActions.register(state.user))
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Register</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className={'form-group' + (state.submitted && (!state.user.email || (errors && errors.email)) ? ' has-error' : '')}>
            <label htmlFor="user_email">Email</label>
            <input type="text" className="form-control" name="email" id="user_email" value={state.user.email} onChange={handleChange} />
            {state.submitted && !state.user.email &&
              <div className="help-block">Email is required</div>
            }
            {state.submitted && errors && errors.email &&
              <div className="help-block">{errors.email}</div>
            }
          </div>
          <div className={'form-group' + (state.submitted && (!state.user.password || (errors && errors.password)) ? ' has-error' : '')}>
            <label htmlFor="user_password">Password</label>
            <input type="password" className="form-control" name="password" id="user_password" value={state.user.password} onChange={handleChange} />
            {state.state.submitted && !state.user.password &&
              <div className="help-block">Password is required</div>
            }
            {state.submitted && errors && errors.password &&
              <div className="help-block">{errors.password}</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/users/sign_in" className="btn btn-link">Cancel</Link>
            <Link to="/users/confirmation/new" className="btn btn-link">Did not received the confirmation email?</Link>
            <Link to="/users/unlocks/new" className="btn btn-link">Did not receive unlock instructions?</Link>
          </div>
        </form>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  const { registering, errors } = state.registration
  return {
    registering,
    errors,
  }
}

export default connect(mapStateToProps)(DeviseRegistrationsNew)
