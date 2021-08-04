import ApiUtils from '../../helpers/ApiUtils'

const confirm = (token) => {
  return fetch(`/users/confirmation?confirmation_token=${token}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

const resendConfirmation = (user) => {
  return fetch('/api/users/confirmation', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: user }),
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

export default {
  confirm,
  resendConfirmation,
}
