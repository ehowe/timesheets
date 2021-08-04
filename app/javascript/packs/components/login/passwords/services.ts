import ApiUtils from '../helpers/ApiUtils'
import FormCsrf from '../helpers/FormCsrf'

const changePassword = ({ user }: { user: any }): Promise<any> => {
  const token = FormCsrf.csrfToken()

  return fetch('/api/users/password', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': token,
    },
    body: JSON.stringify({
      user: {
        password: user.password,
        password_confirmation: user.passwordConfirmation,
        reset_password_token: user.resetPasswordToken,
      },
    }),
    credentials: 'same-origin',
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

const sendResetPasswordInstructions = ({ email }: { email: string }): Promise<any> => {
  return fetch('/api/users/password', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { email: email } }),
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

export default {
  changePassword,
  sendResetPasswordInstructions,
}
