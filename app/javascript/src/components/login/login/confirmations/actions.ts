import alertActions from '../../alerts/actions'
import loginConstants from '../../constants'
import history from '../../helpers/History'
import client from '../../client'

import { FormActionT, FormUserT } from '../../types'

const confirm = ({ user, dispatch }: FormActionT): void => {
  const request = ({ token }: { token: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.CONFIRM, use: loginConstants.CONFIRMATION_REQUEST, payload: token })
  const success = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.CONFIRM, use: loginConstants.CONFIRMATION_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.CONFIRM, use: loginConstants.CONFIRMATION_FAILURE, payload: error.errors })

  dispatch(request({ token: user.token }))

  client.request({ path: '/users/confirmation', method: 'get', params: { confirmation_token: user.token } })
    .then(user => {
      dispatch(success({ user }))
      history.push('/users/sign_in')
      alertActions.success({ dispatch, message: 'Confirmation successful' })
    })
    .catch(error => {
      dispatch(failure({ error }))
      history.push('/')
      alertActions.error({ dispatch, message: 'Something prevented confirming your account' })
    })
}

const resendConfirmation = ({ user, dispatch }: FormActionT): void => {
  const request = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.CONFIRM, use: loginConstants.CONFIRMATION_RESEND_REQUEST, payload: user })
  const success = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.CONFIRM, use: loginConstants.CONFIRMATION_RESEND_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.CONFIRM, use: loginConstants.CONFIRMATION_RESEND_FAILURE, payload: error.errors })

  dispatch(request({ user }))

  client.request({ path: '/api/users/confirmation', method: 'post', data: user })
    .then(() => {
      dispatch(success({ user }))
      history.push('/users/sign_in')
      alertActions.success({ dispatch, message: 'You will receive an email with instructions for how to confirm your email address in a few minutes.' })
    })
    .catch(error => {
      dispatch(failure(error))
      alertActions.error({ dispatch, message: 'Something prevented resending the confirmation email' })
    })
}

export default {
  confirm,
  resendConfirmation,
}
