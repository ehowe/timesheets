import * as React from 'react'

import type { UserT } from '../model.types'

import loginConstants from './constants'
import Utils from '../helpers/Utils'

type LoginProviderPropsT = {
  children: JSX.Element,
}

type StateT = {
  loggedIn: boolean,
  loggingIn: boolean,
  user: any,
}

type ActionT = {
  type: string,
  use: string,
  payload: any,
}

type ReducerT = {
  state: StateT,
  action: ActionT,
}

const localStorageUser = JSON.parse(window.localStorage.getItem('user'))

const INIT_STATE: StateT = {
  loggedIn: !!localStorageUser,
  loggingIn: false,
  messages: [],
  user: localStorageUser || {},
}

type DispatchT = (update: UserT) => void

export const LoginContext = React.createContext<UserT>(null)
export const DispatchLoginContext = React.createContext<DispatchT | typeof undefined>(undefined)

export const LoginProvider: React.FC<LoginProviderPropsT> = (props: LoginProviderPropsT) => {
  const [state, dispatch] = React.useReducer(stateReducer, INIT_STATE)

  return (
    <DispatchLoginContext.Provider value={dispatch}>
      <LoginContext.Provider value={state}>
        {props.children}
      </LoginContext.Provider>
    </DispatchLoginContext.Provider>
  )
}

const stateReducer = (args: ReducerT): StateT | void => {
  const { type, use, payload } = args.action

  switch(type) {
    case loginConstants.LOGIN:
      switch(use) {
        case loginConstants.LOGIN_REQUEST:
          return {
            ...state,
            loggingIn: true,
            user: payload,
          }
        case loginConstants.LOGIN_SUCCESS:
          localStorage.setItem('user', JSON.stringify(payload))
          return {
            ...state,
            loggedIn: true,
            user: { ...payload },
          }
        case loginConstants.LOGIN_FAILURE:
          return { ...state, user: {} }
      }
      break
    case loginConstants.LOGOUT:
      localStorage.removeItem('user')
      return { ...state, user: {} }
    case loginConstants.ALERT:
      switch(use) {
        case loginConstants.ALERT_SUCCESS:
          return {
            ...state,
            messages: [...state.messages, {
              type: 'success',
              text: action.payload,
              id: Utils.genId(),
            }],
          }
        case loginConstants.ALERT_ERROR:
          break
        case loginConstants.ALERT_CLEAR:
          break
      }
      break
    default:
      console.log('Unknown action')
      return args.state
  }
}
