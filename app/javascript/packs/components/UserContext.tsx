import * as React from "react"
import axios from "axios"

import type { UserT } from "../model.types"

type UserProviderT = {
  children: JSX.Element,
}

type DispatchT = (update: UserT) => void

export const UserContext = React.createContext<UserT>({ email: null, first_name: null, last_name: null })
export const DispatchUserContext = React.createContext<DispatchT | typeof undefined>(undefined)

export const UserProvider: React.FC<UserProviderT> = (props: UserProviderT) => {
  const [user, setUser] = React.useState(undefined)

  React.useEffect(() => {
    axios.get("/users/check_for_user")
      .then(response => {
        setUser(response.data)
      })
  }, [])

  return (
    <DispatchUserContext.Provider value={setUser}>
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    </DispatchUserContext.Provider>
  )
}
