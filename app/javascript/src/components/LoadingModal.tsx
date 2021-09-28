import * as React from 'react'
import styled from 'styled-components'

import {
  Modal as BootstrapModal,
  Spinner,
} from 'react-bootstrap'

import { LoadingContext } from './LoadingProvider'

const LoadingModal: React.FC = () => {
  const loading: boolean = React.useContext(LoadingContext)

  return (
    <Modal loading={loading}>
      <Spinner animation="border" color="info" />
    </Modal>
  )
}

const CustomModal = ({ children, className, loading }: { children: JSX.Element, className?: string, loading: boolean }) => (
  <BootstrapModal show={loading} animation={false} contentClassName={className} centered>
    {children}
  </BootstrapModal>
)

const Modal = styled(CustomModal)`
align-items: center;
background: none !important;
border: none !important;
`

export default LoadingModal
