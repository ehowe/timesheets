import * as React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import InlineSpinner from '../../InlineSpinner'
import { DispatchLoginContext, LoginContext } from '../../LoginProvider'

import sessionActions from './actions'

type PropsT = {
  col?: string,
  offset?: string,
}

const DeviseSessionsNew: React.FC<PropsT> = (props: PropsT) => {
  const dispatchLogin = React.useContext(DispatchLoginContext)
  const loginState = React.useContext(LoginContext)
  const { loggingIn } = loginState

  const {
    col = 'md-6',
    offset = 'md-3',
  } = props

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
    <div className="row">
      <div className={classnames(`col-${col}`, `offset-${offset}`)}>
        <h2>Login</h2>
        <form>
          <div className={classnames({ 'has-error': state.submitted && !state.email })}>
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" id="email" onChange={handleChange} className="form-control" value={state.email} />
            {state.submitted && !state.email &&
              <div className="help-block">Email is required</div>
            }
          </div>
          <div className={classnames({ 'has-error': state.submitted && !state.password })}>
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" id="password" onChange={handleChange} className="form-control" value={state.password} />
            {state.submitted && !state.password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <div>
            <button type="button" className={classnames('btn', 'btn-primary')}>Login</button>
            {loggingIn && <InlineSpinner />}
            <Link to="/users/sign_up" className="btn btn-link">Register</Link>
            <Link to="/users/password/new" className="btn btn-link">Forgot your password?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeviseSessionsNew
