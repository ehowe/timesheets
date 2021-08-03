import deviseConstants from '../constants'

export const confirmation = (state = {}, action) => {
  switch (action.type) {
    case deviseConstants.CONFIRMATION_REQUEST:
      return { confirming: true }
    case deviseConstants.CONFIRMATION_SUCCESS:
      return {}
    case deviseConstants.CONFIRMATION_FAILURE:
      return { errors: action.error }
    default:
      return state
  }
}

export const resendConfirmation = (state = {}, action) => {
  switch (action.type) {
    case deviseConstants.CONFIRMATION_RESEND_REQUEST:
      return {}
    case deviseConstants.CONFIRMATION_RESEND_SUCCESS:
      return {}
    case deviseConstants.CONFIRMATION_RESEND_FAILURE:
      return { errors: action.errors }
    default:
      return state
  }
}
