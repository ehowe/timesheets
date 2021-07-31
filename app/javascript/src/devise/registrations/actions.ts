import alertActions from "../../alerts/actions"
import deviseConstants from "../constants"
import history from "../../helpers/History"
import registrationService from "./services"

const register = (user) => {
  const request = (user) => ({ type: deviseConstants.REGISTER_REQUEST, user })
  const success = (user) => ({ type: deviseConstants.REGISTER_SUCCESS, user })
  const failure = (error) => ({
    errors: error,
    type: deviseConstants.REGISTER_FAILURE,
  })

  return dispatch => {
    dispatch(request(user))

    registrationService.register(user)
      .then(() => {
        dispatch(success(user))
        history.push("/users/sign_in")
        dispatch(alertActions.success("Registration successfull"))
      })
      .catch(error => {
        dispatch(failure(error))
        dispatch(alertActions.error("Registration failed"))
      })
  }
}

export default {
  register,
}
