import ApiUtils from '../../helpers/ApiUtils'
import FormCsrf from '../../helpers/FormCsrf'

function resendUnlock({ user }: { user: any }): Promise<any> {
  return fetch('/api/users/unlock', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': FormCsrf.csrfToken(),
    },
    body: JSON.stringify({
      user: {
        email: user.email,
      },
    }),
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

function unlock({ token }: { token: string }): Promise<any> {
  return fetch(`/api/users/unlock?unlock_token=${token}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

export default {
  resendUnlock,
  unlock,
}
