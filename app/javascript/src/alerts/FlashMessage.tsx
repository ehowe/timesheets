import { Alert } from "react-bootstrap"
import * as React from "react"

type PropsT = {
  message: { type: string, text: string },
  timeout?: number,
}

const FlashMessage: React.FC<PropsT> = (props: PropsT) => {
  const {
    message,
    timeout = 3000,
  } = props

  const [visible, setVisible] = React.useState(true)

  function onDismiss() {
    setVisible(false)
  }

  React.useEffect(() => {
    const timer = setTimeout(onDismiss, timeout)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Alert dismissible variant={message.type} show={visible} onClick={onDismiss}>
      {message.text}
    </Alert>
  )
}

export default FlashMessage
