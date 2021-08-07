import * as React from 'react'

import registrationActions from './actions'

import FormInput from '../../FormInput'
import FormSubmit from '../../FormSubmit'
import { DispatchLoginContext, LoginContext } from '../../LoginProvider'

type FieldT = {
  id: string,
  name: string,
  label: string,
  type: string,
  classNames?: string,
}

type PropsT = {
  additionalRequiredFields?: Array<FieldT>,
}

const DeviseRegistrationsNew: React.FC<PropsT> = (props: PropsT) => {
  const {
    additionalRequiredFields = [],
  } = props

  const { registering } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)

  const initState = {
    email: '',
    password: '',
    password_verification: '',
  }

  additionalRequiredFields.forEach(field => {
    initState[field.name] = ''
  })

  const userReducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(userReducer, initState)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    registrationActions.register({ dispatch: dispatchLogin, user: state })
  }

  const submitDisabled = (): boolean => {
    return Object.values(state).some((v: string) => v.length === 0)
  }

  return (
    <div>
      <h2>Register</h2>
      <form>
        <FormInput label="Email" name="email" value={state.email} showValid={registering} onChange={handleChange} />
        <FormInput label="Password" name="password" value={state.password} showValid={registering} onChange={handleChange} />
        <FormInput label="Password verification" name="password_verification" type="password" value={state.password_verification} onChange={handleChange} showValid={registering} />
        { additionalRequiredFields.map((field: FieldT, index: number) => (
          <FormInput label={field.label} name={field.name} value={state[field.name]} type="text" showValid={registering} onChange={handleChange} key={index} />
        ))}
        <FormSubmit
          disabled={submitDisabled}
          links={[{ to: '/users/sign_in', text: 'Cancel' }, { to: '/users/confirmations/new', text: 'Did not receive the confirmation email?' }, { to: '/users/unlocks/new', text: 'Did not receive the unlock instructions?' }]}
          onSubmit={handleSubmit}
          showSpinner={registering}
          text="Register"
        />
      </form>
    </div>
  )
}

export default DeviseRegistrationsNew
