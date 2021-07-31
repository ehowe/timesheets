import axios from "axios"

import FormCsrf from "../../helpers/FormCsrf"

const login = (email, password) => {
  const token = FormCsrf.csrfToken()

  return axios.post("/api/users/sign_in", { user: { email, password } }, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": token,
    },
  })
  .then(response => {
    const user = { ...response.data, valid: true }
    localStorage.setItem("user", JSON.stringify(user))
    return user
  })
}

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("user")
}

export default {
  login,
  logout,
}
