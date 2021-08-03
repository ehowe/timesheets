import alertActions from '../../alerts/actions'
import deviseConstants from '../constants'
import history from '../../helpers/History'
import passwordService from './services'

const changePassword = (user) => {
  const request = (user) => {
    return { type: deviseConstants.CHANGE_PASSWORD_REQUEST, user }
  }
  const success = (user) => {
    return { type: deviseConstants.CHANGE_PASSWORD_SUCCESS, user }
  }
  const failure = (error) => {
    return { type: deviseConstants.CHANGE_PASSWORD_FAILURE, error }
  }

  return dispatch => {
    dispatch(request({ user }))

    passwordService.changePassword(user)
      .then(
        user => {
          dispatch(success(user))
          history.push('/users/sign_in')
          dispatch(alertActions.success('Password changed successfully'))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error('Something prevented the password update'))
        }
      )
  }
}

const sendPasswordInstructions = (user) => {
  const { email } = user

  const request = (email) => {
    return { type: deviseConstants.PASSWORD_RESET_REQUEST, email }
  }
  const success = (email) => {
    return { type: deviseConstants.PASSWORD_RESET_SUCCESS, email }
  }
  const failure = (error) => {
    return { type: deviseConstants.PASSWORD_RESET_FAILURE, errors: error }
  }

  return dispatch => {
    dispatch(request(email))

    passwordService.sendResetPasswordInstructions(email)
      .then(() => {
        dispatch(success(user))
        history.push('/users/sign_in')
        dispatch(alertActions.success('You will receive an email with instructions for how to change your password in a few minutes.'))
      })
      .catch(error => {
        dispatch(failure(error))
        dispatch(alertActions.error('Something prevented sending the password instructions email'))
      })
  }
}

export default {
  changePassword,
  sendPasswordInstructions,
}
