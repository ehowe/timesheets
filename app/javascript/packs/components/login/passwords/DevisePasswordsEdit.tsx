import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import qs from 'query-string'
import {
  Col,
  Row,
} from 'react-bootstrap'

import passwordActions from './actions'
import FormCsrfInput from '../../helpers/FormCsrfInput'

type PropsT = {
  dispatch: any,
  errors: any,
  location: { search: any },
  match: { params: { userId: number } },
  reseting: any,
}

const DevisePasswordsEdit: React.FC<PropsT> = (props: PropsT) => {
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
  const { reseting, errors } = props

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
      props.dispatch(passwordActions.changePassword(user))
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
            {reseting &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/users/sign_in" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  const { reseting, errors } = state.password

  return {
    reseting,
    errors,
  }
}

export default connect(mapStateToProps)(DevisePasswordsEdit)
