import alertActions from '../alerts/actions'
import homeConstants from './constants'
import homeService from './services'

const deleteUser = (id) => {
  const request = (id) => ({ type: homeConstants.DELETE_USER_REQUEST, id })
  const success = (id) => ({ type: homeConstants.DELETE_USER_SUCCESS, id })
  const failure = (id, error) => {
    return { type: homeConstants.DELETE_USER_FAILURE, id, error }
  }

  return dispatch => {
    dispatch(request(id))

    homeService.deleteUser(id)
      .then(() => {
        dispatch(success(id))
      })
      .catch(error => {
        dispatch(alertActions.error('Something prevented to delete this user'))
        dispatch(failure(id, error))
      })
  }
}

const getAll = () => {
  const request = () => ({ type: homeConstants.GET_ALL_USERS_REQUEST })
  const success = (users) => {
    return { type: homeConstants.GET_ALL_USERS_SUCCESS, users }
  }
  const failure = (error) => {
    return { type: homeConstants.GET_ALL_USERS_FAILURE, error }
  }

  return dispatch => {
    dispatch(request())

    homeService.getAllUsers()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      )
  }
}

export default {
  deleteUser,
  getAll,
}
