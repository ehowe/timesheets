import * as React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import qs from 'query-string'

import FormInput from '../FormInput'
import FormSubmit from '../FormSubmit'
import { LoginContext, DispatchLoginContext } from '../LoginProvider'
import passwordActions from './actions'

type PropsT = {
  location: { search: any },
  match: { params: { userId: number } },
}

const DevisePasswordsEdit: React.FC<PropsT> = (props: PropsT) => {
  const { resetting } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)

  const query = qs.parse(props.location.search)

  const initState = {
    password: '',
    password_confirmation: '',
  }

  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, initState)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    dispatch({
      [name]: value,
    })
  }

  function handleSubmit() {
    const id: number = props.match.params.userId
    const reset_password_token: string = query.reset_password_token

    passwordActions.changePassword({ dispatch: dispatchLogin, user: { ...state, id, reset_password_token } })
  }

  const submitDisabled = (): boolean => {
    return Object.values(state).some((value: string) => value.length === 0) && !passwordsMatch()
  }

  const passwordsMatch = (): boolean => {
    return state.password === state.password_confirmation
  }

  const showValid = (): boolean => {
    if (!state.password && !state.password_confirmation) return

    return state.password.length > 0 || state.password_confirmation.length > 0
  }

  const CustomErrors = (): any => (
    <div className="help-block h-100 text-muted">Paswords do not match</div>
  )

  return (
    <div>
      <h2>Change your password</h2>
      <form>
        <FormInput label="Password" name="password" onChange={handleChange} value={state.password} showValid={showValid()} CustomErrors={CustomErrors} isValid={passwordsMatch}/>
        <FormInput label="Password" name="password_confirmation" type="password" onChange={handleChange} value={state.password} showValid={showValid()} CustomErrors={CustomErrors} isValid={passwordsMatch}/>
        <FormSubmit
          disabled={submitDisabled}
          links={[{ to: '/users/sign_in', text: 'Cancel' }]}
          onSubmit={handleSubmit}
          showSpinner={resetting}
          text="Change my password"
        />
      </form>
    </div>
  )
}

export default DevisePasswordsEdit
