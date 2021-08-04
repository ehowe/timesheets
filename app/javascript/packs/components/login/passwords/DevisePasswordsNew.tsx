import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Col,
  Row,
} from 'react-bootstrap'

import passwordActions from './actions'

import InlineSpinner from '../InlineSpinner'
import { LoginContext, DispatchLoginContext } from '../LoginProvider'

const DevisePasswordsNew: React.FC = () => {
  const { sendingPasswordInstructions, errors } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)

  const initState = {
    user: {
      email: '',
    },
    submitted: false,
  }
  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, initState)

  function handleChange(event) {
    const { name, value } = event.target
    dispatch({
      user: {
        ...state.user,
        [name]: value,
      },
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    dispatch({ submitted: true })

    if (state.user.email) {
      passwordActions.sendPasswordInstructions({ dispatch: dispatchLogin, user: state.user })
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Forgot your password?</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className={'form-group' + (state.submitted && (!state.user.email || (errors && errors.email)) ? ' has-error' : '')}>
            <label htmlFor="user_email">Email</label>
            <input type="text" className="form-control" name="email" id="user_email" value={state.user.email} onChange={handleChange} />
            {state.submitted && !state.user.email && (
              <div className="help-block">Email is required</div>
            )}
            {state.submitted && errors && errors.email && (
              <div className="help-block">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Send me reset password instructions</button>
            {sendingPasswordInstructions && <InlineSpinner />}
            <Link to="/users/sign_in" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </Col>
    </Row>
  )
}

export default DevisePasswordsNew
