import * as React from "react"
import axios from "axios"

import { DispatchUserContext } from "./UserContext"

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState("")
  const [pass, setPass] = React.useState("")
  const dispatchUser = React.useContext(DispatchUserContext)

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPassChange = (e) => {
    setPass(e.target.value)
  }

  const onClick = () => {
    console.log("email:", email)
    console.log("pass:", pass)
    axios.post("/users/sign_in", {
      user: { email, password: pass },
    })
    .then(function(response){
      console.log(response)
      dispatchUser(response.data)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  return (
    <div>
      email: <input onChange={onEmailChange} />
      pass:  <input onChange={onPassChange} type="password" />
      <button type="submit" onClick={onClick}>Submit</button>
    </div>
  )
}
