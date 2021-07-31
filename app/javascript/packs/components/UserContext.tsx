import * as React from "react"

import type { UserT } from "../model.types"

type UserProviderT = {
  children: JSX.Element,
}

type DispatchT = (update: UserT) => void

export const UserContext = React.createContext<UserT>(null)
export const DispatchUserContext = React.createContext<DispatchT | typeof undefined>(undefined)

export const UserProvider: React.FC<UserProviderT> = (props: UserProviderT) => {
  const [user, setUser] = React.useState(null)

  return (
    <DispatchUserContext.Provider value={setUser}>
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    </DispatchUserContext.Provider>
  )
}
