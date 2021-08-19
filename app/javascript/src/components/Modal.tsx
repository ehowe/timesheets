import * as React from 'react'

import {
  Modal as BootstrapModal,
} from 'react-bootstrap'

type PropsT = {
  children: JSX.Element,
  handleClose: () => void,
  show: boolean,
  title: string,
}

const Modal: React.FC<PropsT> = (props: PropsT) => {
  const {
    children,
    handleClose,
    show,
    title,
  } = props

  return (
    <BootstrapModal show={show} onHide={handleClose} centered>
      <BootstrapModal.Header closeButton>
        {title}
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  )
}

export default Modal
