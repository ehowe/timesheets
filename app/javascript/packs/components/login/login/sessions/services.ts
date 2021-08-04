import axios from 'axios'

import FormCsrf from '../../helpers/FormCsrf'

import type { LoginPropsT } from './types'

const login = ({ email, password }: LoginPropsT): Promise<any> => {
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
}
