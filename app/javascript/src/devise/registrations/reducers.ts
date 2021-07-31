import deviseConstants from "../constants"

export default (state = {}, action) => {
  switch (action.type) {
    case deviseConstants.REGISTER_REQUEST:
      return { registering: true }
    case deviseConstants.REGISTER_SUCCESS:
      return {}
    case deviseConstants.REGISTER_FAILURE:
      return { errors: action.errors }
    default:
      return state
  }
}
