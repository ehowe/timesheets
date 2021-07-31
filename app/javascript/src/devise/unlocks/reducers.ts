import deviseConstants from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case deviseConstants.UNCLOCK_REQUEST:
      return { unlocking: true }
    case deviseConstants.UNCLOCK_SUCCESS:
      return {}
    case deviseConstants.UNCLOCK_FAILURE:
      return { errors: action.errors }
    default:
      return state
  }
}
