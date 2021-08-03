import Utils from '../helpers/Utils'

const initialState = {
  messages: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
          ...state,
          messages: [...state.messages, {
            type: 'success',
            text: action.message,
            id: Utils.genId(),
          }],
      }
    case alertConstants.ERROR:
      return {
        ...state,
        messages: [...state.messages, {
          type: 'danger',
          text: action.message,
          id: Utils.genId(),
        }],
      }
    case alertConstants.CLEAR:
      return {
        ...state,
        messages: [],
      }
    default:
      return state
  }
}
