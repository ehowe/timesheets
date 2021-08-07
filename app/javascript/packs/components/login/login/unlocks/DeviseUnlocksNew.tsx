import * as React from 'react'

import FormInput from '../../FormInput'
import FormSubmit from '../../FormSubmit'
import { DispatchLoginContext, LoginContext } from '../../LoginProvider'

import unlockActions from './actions'

const DeviseUnlocksNew: React.FC = () => {
  const dispatchLogin = React.useContext(DispatchLoginContext)
  const { unlocking, errors } = React.useContext(LoginContext)

  const initState = {
    email: '',
  }

  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, initState)

  function handleChange(event) {
    const { name, value } = event.target

    dispatch({
      [name]: value,
    })
  }

  function handleSubmit() {
    unlockActions.resendUnlock({ dispatch: dispatchLogin, user: state })
  }

  const submitDisabled = (): boolean => {
    return Object.values(state).some((value: string) => value.length === 0)
  }

  return (
    <div>
      <h2>Resend unlock instructions</h2>
      <form>
        <FormInput label="Email" name="email" value={state.email} onChange={handleChange} showValid={unlocking} />
        <FormSubmit
          disabled={submitDisabled}
          links={[{ to: '/users/sign_up', text: 'Cancel' }]}
          onSubmit={handleSubmit}
          showSpinner={unlocking}
          text="Resend unlock instructions"
        />
      </form>
    </div>
  )
}

export default DeviseUnlocksNew
