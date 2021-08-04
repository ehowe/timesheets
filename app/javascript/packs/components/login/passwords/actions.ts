import loginConstants from '../constants'
import alertActions from '../alerts/actions'
import history from '../helpers/History'
import passwordService from './services'

const changePassword = ({ user, dispatch }: { user: any, dispatch: (any) => void }): void => {
  const { email } = user
  const request = ({ email }: { email: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.CHANGE_PASSWORD_REQUEST, payload: email })
  const success = ({ user }: { user: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.CHANGE_PASSWORD_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.CHANGE_PASSWORD_FAILURE, payload: error.errors })

  dispatch(request({ email }))

  passwordService.changePassword({ user })
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

const sendPasswordInstructions = ({ user, dispatch }: { user: any, dispatch: (any) => void }): void => {
  const { email } = user
  const request = ({ email }: { email: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.PASSWORD_RESET_REQUEST, payload: email })
  const success = ({ user }: { user: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.PASSWORD_RESET_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.PASSWORD, use: loginConstants.PASSWORD_RESET_FAILURE, payload: error.errors })

  dispatch(request({ email }))

  passwordService.sendResetPasswordInstructions({ email })
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
