import * as React from 'react'
import * as Cookies from 'js-cookie'
import { get, split } from 'lodash'

import type { MessageT } from './types'

import loginConstants from './constants'
import Utils from './helpers/Utils'

type LoginProviderPropsT = {
  userCookieName?: string,
  children: JSX.Element,
}

type StateT = {
  confirming: boolean,
  loggedIn: boolean,
  loggingIn: boolean,
  errors: Array<string>,
  messages: Array<MessageT>,
  registering: boolean,
  resetting: boolean,
  sendingPasswordInstructions: boolean,
  unlocking: boolean,
  user: any,
}

type ActionT = {
  type: string,
  use?: string,
  payload: any,
}

const INIT_STATE: StateT = {
  confirming: false,
  errors: [],
  loggedIn: false,
  loggingIn: false,
  messages: [],
  registering: false,
  resetting: false,
  sendingPasswordInstructions: false,
  unlocking: false,
  user: {},
}

type DispatchT = (update: any) => void

export const LoginContext = React.createContext(null)
export const DispatchLoginContext = React.createContext<DispatchT | typeof undefined>(undefined)

export const LoginProvider: React.FC<LoginProviderPropsT> = (props: LoginProviderPropsT) => {
  const userCookieName = props.userCookieName

  if (userCookieName) {
    const cookie = Cookies.get(userCookieName)

    if (cookie) {
      const user = unescape(split(cookie, '--')[0])
      const decodedUser = JSON.parse(atob(user))
      const decodedStoredUser = atob(get(decodedUser, '_rails.message'))

      if (decodedStoredUser) {
        INIT_STATE.loggedIn = true
        INIT_STATE.user = JSON.parse(decodedStoredUser)
      }
    }
  }

  const stateReducer = (state: StateT, action: ActionT) => {
    const { type, use, payload } = action

    switch(type) {
      case 'existingUser':
        return { ...state, user: payload }
      case loginConstants.LOGIN:
        switch(use) {
          case loginConstants.LOGIN_REQUEST:
            return {
              ...state,
              loggingIn: true,
              user: payload,
            }
          case loginConstants.LOGIN_SUCCESS:
            return {
              ...state,
              loggedIn: true,
              user: payload,
            }
          case loginConstants.LOGIN_FAILURE:
            return { ...state, user: {} }
        }
        break
      case loginConstants.LOGOUT:
        if (userCookieName) Cookies.remove(userCookieName)

        return { ...INIT_STATE, loggedIn: false, user: {} }
      case loginConstants.PASSWORD_RESET:
        switch(use) {
          case loginConstants.PASSWORD_RESET_REQUEST:
            return { ...state, resetting: true }
          case loginConstants.PASSWORD_RESET_SUCCESS:
            return { ...state, resetting: false }
          case loginConstants.PASSWORD_RESET_FAILURE:
            return { ...state, errors: [payload] }
        }
        break
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
          case loginConstants.UNLOCK_FAILURE:
            return { ...state, errors: [payload] }
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

  const [state, dispatch] = React.useReducer(stateReducer, INIT_STATE)

  return (
    <DispatchLoginContext.Provider value={dispatch}>
      <LoginContext.Provider value={state}>
        {props.children}
      </LoginContext.Provider>
    </DispatchLoginContext.Provider>
  )
}
