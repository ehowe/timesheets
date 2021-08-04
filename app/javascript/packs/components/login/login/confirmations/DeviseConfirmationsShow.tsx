import * as React from 'react'
import {
  Col,
  Row,
} from 'react-bootstrap'

import confirmationActions from './actions'

import { DispatchLoginContext } from '../../LoginProvider'

type PropsT = {
  location: { search: any },
}

const DeviseConfirmationsShow: React.FC<PropsT> = (props: PropsT) => {
  const dispatch = React.useContext(DispatchLoginContext)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)
    const token = urlParams.get('confirmation_token')

    confirmationActions.confirm({ token, dispatch })
  }, [])

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Confirming your account ...</h2>
      </Col>
    </Row>
  )
}

export default DeviseConfirmationsShow
