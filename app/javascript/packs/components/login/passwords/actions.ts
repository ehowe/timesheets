import client from '../client'
import loginConstants from '../constants'
import alertActions from '../alerts/actions'
import history from '../helpers/History'

import { FormActionT, FormUserT } from '../types'

const changePassword = ({ user, dispatch }: FormActionT): void => {
  const { email } = user
  const request = ({ email }: { email: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.CHANGE_PASSWORD_REQUEST, payload: email })
  const success = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.CHANGE_PASSWORD_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.CHANGE_PASSWORD_FAILURE, payload: error.errors })

  dispatch(request({ email }))

  client.request({ path: '/api/users/password', method: 'patch', data: { user } })
    .then(
      user => {
        dispatch(success({ user }))
        history.push('/users/sign_in')
        alertActions.success({ dispatch, message: 'Password changed successfully' })
      },
      error => {
        dispatch(failure({ error }))
        alertActions.error({ dispatch, message: 'Something prevented the password update' })
      }
    )
}

const sendPasswordInstructions = ({ user, dispatch }: FormActionT): void => {
  const { email } = user
  const request = ({ email }: { email: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.PASSWORD_RESET_REQUEST, payload: email })
  const success = ({ user }: { user: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.PASSWORD_RESET_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.PASSWORD_RESET_FAILURE, payload: error.errors })

  dispatch(request({ email }))

  client.request({ path: '/api/users/password', method: 'post', data: user })
    .then(() => {
      dispatch(success({ user }))
      history.push('/users/sign_in')
      alertActions.success({ dispatch, message: 'You will receive an email with instructions for how to change your password in a few minutes.' })
    })
    .catch(error => {
      dispatch(failure({ error }))
      alertActions.error({ dispatch, message: 'Something prevented sending the password instructions email' })
    })

}

export default {
  changePassword,
  sendPasswordInstructions,
}
