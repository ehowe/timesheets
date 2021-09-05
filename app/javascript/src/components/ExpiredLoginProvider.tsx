import * as React from 'react'

import { Redirect } from 'react-router-dom'
import { LoginContext, DispatchLoginContext } from './login/LoginProvider'

type PropsT = {
  children: JSX.Element | Array<JSX.Element>,
}

export const SetExpiredLoginContext = React.createContext(null)

export const ExpiredLoginProvider: React.FC<PropsT> = (props: PropsT) => {
  const { loggedIn } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)

  const [expiredLogin, setExpiredLogin] = React.useState(!loggedIn)

  const handleErrorResponse = (error: any) => {
    if (error.response?.status === 401) {
      dispatchLogin({ type: 'logout' })
      dispatchLogin({ type: 'alert', use: 'ALERT_ERROR', payload: 'Session expired' })

      setExpiredLogin(true)
    }
  }

  console.log(expiredLogin)

  return(
    <SetExpiredLoginContext.Provider value={{ handleErrorResponse }}>
      { expiredLogin && <Redirect to="/" /> }
      {props.children}
    </SetExpiredLoginContext.Provider>
  )
}
