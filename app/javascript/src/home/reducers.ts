import homeConstants from './constants'

const initialState = {
  deletingUser: false,
  loading: false,
  items: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case homeConstants.DELETE_USER_REQUEST:
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      }
    case homeConstants.DELETE_USER_SUCCESS:
      return {
        items: state.items.filter(user => user.id !== action.id)
      }
    case homeConstants.DELETE_USER_FAILURE:
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error.message }
          }

          return user
        })
      }
    case homeConstants.GET_ALL_USERS_REQUEST:
      return { loading: true }
    case homeConstants.GET_ALL_USERS_SUCCESS:
      return {
        loading: false,
        items: action.users
      }
    case homeConstants.GET_ALL_USERS_FAILURE:
      return {
        loading: false,
        items: []
      }
    default:
      return state
  }
}
