import * as React from 'react'

import FormInput from '../../FormInput'
import FormSubmit from '../../FormSubmit'
import { DispatchLoginContext, LoginContext } from '../../LoginProvider'

import sessionActions from './actions'

const DeviseSessionsNew: React.FC = () => {
  const dispatchLogin = React.useContext(DispatchLoginContext)
  const loginState = React.useContext(LoginContext)
  const { loggingIn } = loginState

  const initState = {
    email: '',
    password: '',
  }

  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, initState)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    dispatch({
      [name]: value,
    })
  }

  function handleSubmit(): void {
    sessionActions.login({ user: state, dispatch: dispatchLogin })
  }

  const submitDisabled = (): boolean => {
    return Object.values(state).some((value: string) => value.length === 0)
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <FormInput label="Email" name="email" onChange={handleChange} value={state.email} showValid={loggingIn} />
        <FormInput label="Password" name="password" onChange={handleChange} value={state.password} showValid={loggingIn} />
        <FormSubmit
          disabled={submitDisabled}
          links={[{ to: '/users/sign_up', text: 'Register' }, { to: '/users/password/new', text: 'Forgot your password?' }]}
          onSubmit={handleSubmit}
          showSpinner={loggingIn}
          text="Login"
        />
      </form>
    </div>
  )
}

export default DeviseSessionsNew
