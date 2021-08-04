import alertActions from '../../alerts/actions'
import history from '../../helpers/History'
import loginConstants from '../../constants'
import unlockService from './service'

const resendUnlock = ({ user, dispatch }: { user: any, dispatch: (any) => void }): void => {
  const request = ({ user }: { user: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_RESEND_REQUEST, payload: user })
  const success = ({ user }: { user: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_RESEND_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_RESEND_FAILURE, payload: error.errors })

  dispatch(request({ user }))

  unlockService.resendUnlock({ user })
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

const unlock = ({ token, dispatch }: { token: string, dispatch: (any) => void }): void => {
  const request = ({ token }: { token: string }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_REQUEST, payload: token })
  const success = ({ user }: { user: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_SUCCESS, payload: user })
  const failure = ({ error }: { error: any }): { type: string, use: string, payload: any } => ({ type: loginConstants.UNLOCK, use: loginConstants.UNLOCK_FAILURE, payload: error })

  dispatch(request({ token }))

  unlockService.unlock({ token })
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
