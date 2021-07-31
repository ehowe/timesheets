import ApiUtils from "../../helpers/ApiUtils"

const register = (user) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user }),
  })
  .then(ApiUtils.checkStatus)
  .then(response => response.json())
}

export default {
  register,
}
