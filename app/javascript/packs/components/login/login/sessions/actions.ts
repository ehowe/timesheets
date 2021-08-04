import alertActions from '../../alerts/actions'
import loginConstants from '../../constants'
import history from '../../helpers/History'
import sessionService from './services'

import type { LoginPropsT } from './types'

const login = ({ email, password, dispatch }: LoginPropsT): void => {
  const request = ({ email }: { email: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.LOGIN, use: loginConstants.LOGIN_REQUEST, payload: email })
  const success = ({ user }: { user: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.LOGIN, use: loginConstants.LOGIN_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.LOGIN, use: loginConstants.LOGIN_FAILURE, payload: error.errors })

  dispatch(request({ email }))

  sessionService.login({ email, password })
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

const logout = ({ dispatch }: { dispatch: (any) => void }): void => {
  dispatch({ type: loginConstants.ALERT, use: loginConstants.ALERT_SUCCESS, payload: 'Logged out' })
  dispatch({ type: loginConstants.LOGOUT })
}

export default {
  login,
  logout,
}
