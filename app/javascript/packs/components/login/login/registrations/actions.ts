import alertActions from '../../alerts/actions'
import loginConstants from '../../constants'
import history from '../../helpers/History'
import registrationService from './services'

const register = ({ user, dispatch }: { user: any, dispatch: (any) => void }): void => {
  const request = ({ user }: { user: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.REGISTER, use: loginConstants.REGISTER_REQUEST, payload: user })
  const success = ({ user }: { user: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.REGISTER, use: loginConstants.REGISTER_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.REGISTER, use: loginConstants.REGISTER_FAILURE, payload: error.errors })

  dispatch(request({ user }))

  registrationService.register({ user })
    .then(() => {
      dispatch(success({ user }))
      history.push('/users/sign_in')
      alertActions.success({ dispatch, message: 'Registration successfull' })
    })
    .catch(error => {
      dispatch(failure({ error }))
      alertActions.error({ dispatch, message: 'Registration failed' })
    })
}

export default {
  register,
}
