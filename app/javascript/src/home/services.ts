import ApiUtils from '../helpers/ApiUtils'
import AuthHeader from '../helpers/AuthHeader'

function deleteUser(id) {
  return fetch('/api/users/' + id, {
    method: 'DELETE',
    headers: AuthHeader()
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

function getAllUsers() {
  return fetch('/api/users', {
    method: 'GET',
    headers: AuthHeader()
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

export default {
  deleteUser,
  getAllUsers
}
