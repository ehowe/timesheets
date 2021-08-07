import alertActions from '../../alerts/actions'
import loginConstants from '../../constants'
import history from '../../helpers/History'
import client from '../../client'

import { FormActionT, FormUserT } from '../../types'

const login = ({ user, dispatch }: FormActionT): void => {
  const request = ({ email }: { email: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.LOGIN, use: loginConstants.LOGIN_REQUEST, payload: email })
  const success = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.LOGIN, use: loginConstants.LOGIN_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.LOGIN, use: loginConstants.LOGIN_FAILURE, payload: error.errors })

  dispatch(request({ email: user.email }))

  client.request({ path: '/api/users/sign_in', data: { user }, method: 'post' })
    .then(
      user => {
        dispatch(success({ user }))
        alertActions.success({ message: 'Login successful', dispatch })
        history.push('/')
      },
      error => {
        dispatch(failure({ error }))
        alertActions.error({ message: 'Login failure', dispatch })
      }
    )
}

const logout = ({ dispatch }: FormActionT): void => {
  client.request({ path: '/api/users/sign_out', method: 'delete' })
    .then(() => {
      dispatch({ type: loginConstants.ALERT, use: loginConstants.ALERT_SUCCESS, payload: 'Logged out' })
      dispatch({ type: loginConstants.LOGOUT })
    })
}

export default {
  login,
  logout,
}
