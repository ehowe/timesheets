import deviseConstants from "../constants"

const localStorageUser = JSON.parse(localStorage.getItem("user"))
const defaultUser = {
  email: null,
  first_name: null,
  last_name: null,
  valid: false,
  admin: false,
}

const user = localStorageUser || defaultUser

const initialState = {
  loggingIn: false,
  loggedIn: false,
  user: user,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case deviseConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      }
    case deviseConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: { ...action.user, valid: true },
      }
    case deviseConstants.LOGIN_FAILURE:
      return { ...initialState, user: defaultUser }
    case deviseConstants.LOGOUT:
      return { ...initialState, user: defaultUser }
    default:
      return state
  }
}
