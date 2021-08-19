import * as React from 'react'

import FormInput from '../FormInput'
import FormSubmit from '../FormSubmit'
import { DispatchLoginContext, LoginContext } from '../LoginProvider'

import passwordActions from './actions'

const DevisePasswordsNew: React.FC = () => {
  const { sendingPasswordInstructions } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)
  const [email, setEmail] = React.useState('')

  function handleSubmit(): void {
    passwordActions.sendPasswordInstructions({ dispatch: dispatchLogin, user: { email } })
  }

  return (
    <div>
      <h2>Forgot your password?</h2>
      <form name="form">
        <FormInput label="Email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} showValid={sendingPasswordInstructions} />
        <FormSubmit
          disabled={() => email.length === 0}
          links={[{ to: '/users/sign_in', text: 'Cancel' }]}
          onSubmit={handleSubmit}
          showSpinner={sendingPasswordInstructions}
          text="Send me password reset instructions"
        />
      </form>
    </div>
  )
}

export default DevisePasswordsNew
