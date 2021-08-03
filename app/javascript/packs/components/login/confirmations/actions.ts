import alertActions from '../../alerts/actions'
import deviseConstants from '../constants'
import history from '../../helpers/History'
import confirmationService from './service'

const confirm = (token) => {
  const request = (user) => {
    return { type: deviseConstants.CONFIRMATION_REQUEST, user }
  }
  const success = (user) => {
    return { type: deviseConstants.CONFIRMATION_SUCCESS, user }
  }
  const failure = (error) => {
    return { type: deviseConstants.CONFIRMATION_FAILURE, error }
  }

  return dispatch => {
    dispatch(request({ token }))

    confirmationService.confirm(token)
      .then(user => {
        dispatch(success(user))
        history.push('/users/sign_in')
        dispatch(alertActions.success('Confirmation successfull'))
      })
      .catch(error => {
        dispatch(failure(error.message))
        history.push('/')
        dispatch(alertActions.error('Something prevented from confirming your account'))
      })
  }
}

const resendConfirmation = (user) => {
  const request = (user) => {
    return { type: deviseConstants.CONFIRMATION_RESEND_REQUEST, user }
  }
  const success = (user) => {
    return { type: deviseConstants.CONFIRMATION_RESEND_SUCCESS, user }
  }
  const failure = (error) => ({
    type: deviseConstants.CONFIRMATION_RESEND_FAILURE,
    errors: error.errors,
  })

  return dispatch => {
    dispatch(request(user))

    confirmationService.resendConfirmation(user)
      .then(() => {
        dispatch(success(user))
        history.push('/users/sign_in')
        dispatch(alertActions.success('You will receive an email with instructions for how to confirm your email address in a few minutes.'))
      })
      .catch(error => {
        dispatch(failure(error))
        dispatch(alertActions.error('Something prevented resending the confirmation email'))
      })
  }
}

export default {
  confirm,
  resendConfirmation,
}
