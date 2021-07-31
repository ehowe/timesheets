import alertActions from "../../alerts/actions"
import history from "../../helpers/History"
import deviseConstants from "../constants"
import unlockService from "./service"

const resendUnlock = (user) => {
  const request = (user) => {
    return { type: deviseConstants.UNLOCK_RESEND_REQUEST, user }
  }
  const success = (user) => {
    return { type: deviseConstants.UNLOCK_RESEND_SUCCESS, user }
  }
  const failure = (error) => {
    return { type: deviseConstants.UNLOCK_RESEND_FAILURE, errors: error.errors }
  }

  return dispatch => {
    dispatch(request(user))

    unlockService.resendUnlock(user)
      .then(() => {
        dispatch(success(user))
        history.push("/users/sign_in")
        dispatch(alertActions.success("You will receive an email with instructions for how to unlock your account in a few minutes."))
      })
      .catch(error => {
        dispatch(failure(error.message))
        dispatch(alertActions.error("Something prevented resending the unlock instructions email"))
      })
  }
}

const unlock = (token) => {
  const request = (user) => ({ type: deviseConstants.UNCLOCK_REQUEST, user })
  const success = (user) => ({ type: deviseConstants.UNCLOCK_SUCCESS, user })
  const failure = (error) => ({ type: deviseConstants.UNCLOCK_FAILURE, error })

  return dispatch => {
    dispatch(request({ token }))

    unlockService.unlock(token)
      .then(
        user => {
          dispatch(success(user))
          history.push("/users/sign_in")
          dispatch(alertActions.success("Your account has been unlocked successfully. Please sign in to continue."))
        },
        error => {
          dispatch(failure(error.error))
          history.push("/users/sign_in")
          dispatch(alertActions.error("Something prevented to unlock your account."))
        }
      )
  }
}

export default {
  resendUnlock,
  unlock,
}
