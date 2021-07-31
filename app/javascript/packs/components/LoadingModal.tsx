import * as React from "react"

import {
  Modal,
  Spinner,
} from "react-bootstrap"

import { LoadingContext } from "./LoadingProvider"

const LoadingModal: React.FC = () => {
  const loading: boolean = React.useContext(LoadingContext)

  return (
    <Modal show={loading} animation={false} centered contentClassName="spinner-modal">
      <Spinner animation="border" color="info" />
    </Modal>
  )
}

export default LoadingModal
