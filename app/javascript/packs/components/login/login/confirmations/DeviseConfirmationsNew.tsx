import * as React from 'react'

import FormInput from '../../FormInput'
import FormSubmit from '../../FormSubmit'
import InlineSpinner from '../../InlineSpinner'
import { DispatchLoginContext, LoginContext } from '../../LoginProvider'

import confirmationActions from './actions'

const DeviseConfirmationsNew: React.FC = () => {
  const { sendingPasswordInstructions, errors } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)
  const [email, setEmail] = React.useState('')

  function handleSubmit() {
    confirmationActions.resendConfirmation({ user: { email }, dispatch: dispatchLogin })
  }

  return (
    <div>
      <h2>Resend confirmation instructions</h2>
      <form name="form">
        <FormInput label="Email" name="email" value={email} showValid={sendingPasswordInstructions} onChange={(e) => setEmail(e.target.value)}/>
        <FormSubmit
          disabled={() => email.length === 0}
          links={[{ to: '/users/sign_up', text: 'Cancel' }]}
          onSubmit={handleSubmit}
          showSpinner={sendingPasswordInstructions}
          text="Resend confirmation instructions"
        />
      </form>
    </div>
  )
}

export default DeviseConfirmationsNew
