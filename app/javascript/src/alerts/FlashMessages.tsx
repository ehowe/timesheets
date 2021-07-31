import * as React from "react"
import { connect } from "react-redux"

import FlashMessage from "./FlashMessage"

type PropsT = {
  messages?: Array<{ id: number, type: string, text: string }>,
}

const FlashMessages: React.FC<PropsT> = (props: PropsT) => {
  const { messages = [] } = props

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


function mapStateToProps(state) {
  const { messages } = state.alert
  return {
    messages,
  }
}

export default connect(mapStateToProps)(FlashMessages)
