import * as React from 'react'
import { Link } from 'react-router-dom'
import qs from 'query-string'
import {
  Col,
  Row,
} from 'react-bootstrap'

import InlineSpinner from '../InlineSpinner'
import { LoginContext, DispatchLoginContext } from '../LoginProvider'
import passwordActions from './actions'
import FormCsrfInput from '../helpers/FormCsrfInput'

type PropsT = {
  location: { search: any },
  match: { params: { userId: number } },
}

const DevisePasswordsEdit: React.FC<PropsT> = (props: PropsT) => {
  const { resetting, errors } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)

  const query = qs.parse(props.location.search)

  const initState = {
    user: {
      id: props.match.params.userId,
      resetPasswordToken: query.reset_password_token,
      password: '',
      passwordConfirmation: '',
    },
    submitted: false,
  }

  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, initState)

  function handleChange(event) {
    const { name, value } = event.target
    const { user } = this.state

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

    const { user } = this.state

    if (user.password && user.passwordConfirmation) {
      passwordActions.changePassword({ dispatch, user })
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Change your password</h2>
        <form name="form" onSubmit={handleSubmit}>
          <FormCsrfInput />
          <div className={'form-group' + (state.submitted && (!state.user.password || (errors && errors.password)) ? ' has-error' : '')}>
            <label htmlFor="user_password">New password</label>
            <input type="password" className="form-control" name="password" id="user_password" value={state.user.password} onChange={handleChange} />
            {state.submitted && !state.user.password &&
              <div className="help-block">New password is required</div>
            }
            {state.submitted && errors && errors.password &&
              <div className="help-block">{errors.password}</div>
            }
          </div>
          <div className={'form-group' + (state.submitted && (!state.user.passwordConfirmation || (errors && errors.passwordConfirmation)) ? ' has-error' : '')}>
            <label htmlFor="user_passwordConfirmation">Confirm new password</label>
            <input type="password" className="form-control" name="passwordConfirmation" id="user_passwordConfirmation" value={state.user.passwordConfirmation} onChange={handleChange} />
            {state.submitted && !state.user.passwordConfirmation &&
              <div className="help-block">Confirm new password is required</div>
            }
            {state.submitted && errors && errors.passwordConfirmation &&
              <div className="help-block">{errors.passwordConfirmation}</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Change my password</button>
            {resetting && <InlineSpinner />}
            <Link to="/users/sign_in" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </Col>
    </Row>
  )
}

export default DevisePasswordsEdit
