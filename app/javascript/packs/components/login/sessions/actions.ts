import { useContext } from 'react'

import alertActions from '../../alerts/actions'
import loginConstants from '../constants'
import history from '../../helpers/History'
import sessionService from './services'

import type { LoginPropsT } from './types'

import { DispatchLoginContext } from '../LoginProvider'

const dispatchLogin = useContext(DispatchLoginContext)

const login: () => void = ({ email, password }: LoginPropsT) => {
  const request = user => {
    return { type: loginConstants.LOGIN_REQUEST, payload: user }
  }
  const success = user => {
    return { type: loginConstants.LOGIN_SUCCESS, payload: user }
  }
  const failure = error => {
    return { type: loginConstants.LOGIN_FAILURE, payload: error }
  }

  dispatchLogin(request({ email }))

  sessionService.login({ email, password })
    .then(
      user => {
        dispatch(success(user))
        dispatch(alertActions.success('Login successful'))
        history.push('/')
      },
      error => {
        dispatchLogin(failure(error))
        dispatchLogin(alertActions.error('Login failure'))
      }
    )
}

const logout: { type: string } = () => {
  return { type: loginConstants.LOGOUT  }
}

export default {
  login,
  logout,
}
