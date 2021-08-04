import * as React from 'react'
import classnames from 'classnames'

type PropsT = {
  message: { type: string, text: string },
  timeout?: number,
}

import './FlashMessage.css'

const FlashMessage: React.FC<PropsT> = (props: PropsT) => {
  const {
    message,
    timeout = 5000,
  } = props

  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(true)

  const onDismiss = (): void => setVisible(false)

  React.useEffect(() => {
    const timer = setTimeout(onDismiss, timeout)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div role="alert" className={classnames('alert', `alert-${message.type}`, `alert-dismissible`, 'alert-absolute', visible ? 'alert-show' : 'alert-fade')} ref={ref}>
      <button type="button" className={classnames('btn-close', 'btn-close-white')} aria-label="Close" onClick={onDismiss} data-bs-dismiss="alert"/>
      {message.text}
    </div>
  )
}

export default FlashMessage
