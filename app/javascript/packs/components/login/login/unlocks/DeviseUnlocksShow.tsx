import * as React from 'react'
import {
  Col,
  Row,
} from 'react-bootstrap'

import { DispatchLoginContext } from '../../LoginProvider'

import unlockActions from './actions'

type PropsT = {
  location: { search: any },
}

const DeviseUnlocksShow: React.FC<PropsT> = (props: PropsT) => {
  const dispatch = React.useContext(DispatchLoginContext)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)
    const token = urlParams.get('unlock_token')

    unlockActions.unlock({ dispatch, token })
  }, [])

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Unlocking your account ...</h2>
      </Col>
    </Row>
  )
}

export default DeviseUnlocksShow
