import alertActions from '../../alerts/actions'
import history from '../../helpers/History'
import loginConstants from '../../constants'
import client from '../../client'

import { FormActionT, FormUserT } from '../../types'

const resendUnlock = ({ user, dispatch }: FormActionT): void => {
  const request = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_RESEND_REQUEST, payload: user })
  const success = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_RESEND_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_RESEND_FAILURE, payload: error.errors })

  dispatch(request({ user }))

  client.request({ path: '/api/users/unlock', method: 'post', data: user })
    .then(() => {
      dispatch(success({ user }))
      history.push('/users/sign_in')
      alertActions.success({ dispatch, message: 'You will receive an email with instructions for how to unlock your account in a few minutes.' })
    })
    .catch(error => {
      dispatch(failure({ error }))
      alertActions.error({ dispatch, message: 'Something prevented resending the unlock instructions email' })
    })
}

const unlock = ({ user, dispatch }: FormActionT): void => {
  const request = ({ token }: { token: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_REQUEST, payload: token })
  const success = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_FAILURE, payload: error })

  dispatch(request({ token: user.token }))

  client.request({ path: '/api/users/unlock', params: { 'unlock_token': user.token }, method: 'get' })
    .then(
      user => {
        dispatch(success({ user }))
        history.push('/users/sign_in')
        alertActions.success({ dispatch, message: 'Your account has been unlocked successfully. Please sign in to continue.' })
      },
      error => {
        dispatch(failure({ error }))
        history.push('/users/sign_in')
        alertActions.error({ dispatch, message: 'Something prevented unlocking your account.' })
      }
    )
}

export default {
  resendUnlock,
  unlock,
}
