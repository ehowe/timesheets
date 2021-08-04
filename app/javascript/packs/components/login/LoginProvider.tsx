import * as React from 'react'

import type { MessageT } from './types'

import loginConstants from './constants'
import Utils from './helpers/Utils'

type LoginProviderPropsT = {
  children: JSX.Element,
}

type StateT = {
  confirming: boolean,
  loggedIn: boolean,
  loggingIn: boolean,
  errors: Array<string>,
  messages: Array<MessageT>,
  registering: boolean,
  unlocking: boolean,
  user: any,
}

type ActionT = {
  type: string,
  use: string,
  payload: any,
}

const localStorageUser = JSON.parse(window.localStorage.getItem('user'))

const INIT_STATE: StateT = {
  confirming: false,
  errors: [],
  loggedIn: !!localStorageUser,
  loggingIn: false,
  messages: [],
  registering: false,
  unlocking: false,
  user: localStorageUser || {},
}

type DispatchT = (update: any) => void

export const LoginContext = React.createContext(null)
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

const stateReducer = (state: StateT, action: ActionT) => {
  const { type, use, payload } = action

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
              text: payload,
              id: Utils.genId(),
            }],
          }
        case loginConstants.ALERT_ERROR:
          return {
            ...state,
            messages: [...state.messages, {
              type: 'danger',
              text: payload,
              id: Utils.genId(),
            }],
          }
        case loginConstants.ALERT_CLEAR:
          return {
            ...state,
            messages: [],
          }
      }
      break
    case loginConstants.UNLOCK:
      switch(use) {
        case loginConstants.UNLOCK_REQUEST:
          return { ...state, unlocking: true }
        case loginConstants.UNLOCK_SUCCESS:
          return { ...state, unlocking: false }
          break
        case loginConstants.UNLOCK_FAILURE:
          return { ...state, errors: [payload] }
          break
      }
      break
    case loginConstants.REGISTER:
      switch(use) {
        case loginConstants.REGISTER_REQUEST:
          return { ...state, registering: true }
        case loginConstants.REGISTER_SUCCESS:
          return { ...state, registering: false }
        case loginConstants.REGISTER_FAILURE:
          return { ...state, errors: payload }
          break
      }
      break
    case loginConstants.CONFIRM:
      switch(use) {
        case loginConstants.CONFIRMATION_REQUEST:
          return { ...state, confirming: true }
        case loginConstants.CONFIRMATION_SUCCESS:
          return { ...state, confirming: false }
        case loginConstants.CONFIRMATION_FAILURE:
          return { ...state, errors: payload }
        case loginConstants.CONFIRMATION_RESEND_REQUEST:
          return { ...state }
        case loginConstants.CONFIRMATION_RESEND_SUCCESS:
          return { ...state }
        case loginConstants.CONFIRMATION_RESEND_FAILURE:
          return { ...state, errors: payload }
      }
      break
    default:
      console.log('Unknown action')
      return { ...state }
  }
}
