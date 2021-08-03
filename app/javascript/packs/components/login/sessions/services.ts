import axios from 'axios'

import FormCsrf from '../../helpers/FormCsrf'

import type { LoginPropsT } from './types'

const login: void = ({ email, password }: LoginPropsT) => {
  const token = FormCsrf.csrfToken()

  return axios.post('/api/users/sign_in', { user: { email, password } }, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
    },
  })
  .then(response => {
    const user = { ...response.data, valid: true }
    localStorage.setItem('user', JSON.stringify(user))
    return user
  })
}

export default {
  login,
  logout,
}
