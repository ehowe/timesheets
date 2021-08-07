import alertActions from '../../alerts/actions'
import loginConstants from '../../constants'
import history from '../../helpers/History'
import client from '../../client'

import { FormActionT, FormUserT } from '../../types'

const register = ({ user, dispatch }: FormActionT): void => {
  const request = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.REGISTER, use: loginConstants.REGISTER_REQUEST, payload: user })
  const success = ({ user }: { user: FormUserT }): { type: string, use: string, payload: any } => ({ type: loginConstants.REGISTER, use: loginConstants.REGISTER_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.REGISTER, use: loginConstants.REGISTER_FAILURE, payload: error.errors })

  dispatch(request({ user }))

  client.request({ path: '/api/users', data: { user }, method: 'post' })
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
