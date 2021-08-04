import * as React from 'react'

import FlashMessage from './FlashMessage'

import { LoginContext } from '../LoginProvider'

const FlashMessages: React.FC = () => {
  const { messages } = React.useContext(LoginContext)

  const flashMessages = messages.map(message => {
    return (
      <FlashMessage key={message.id} message={message} />
    )
  })

  return(
    <div>
      {flashMessages}
    </div>
  )
}

export default FlashMessages
