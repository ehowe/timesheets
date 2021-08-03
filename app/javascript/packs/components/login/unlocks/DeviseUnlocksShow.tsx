import * as React from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Row,
} from 'react-bootstrap'

import unlockActions from './actions'

type PropsT = {
  dispatch: any,
  location: { search: any },
}

const DeviseUnlocksShow: React.FC<PropsT> = (props: PropsT) => {
  React.useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)
    const token = urlParams.get('unlock_token')

    props.dispatch(unlockActions.unlock(token))
  }, [])

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Unlocking your account ...</h2>
      </Col>
    </Row>
  )
}

export default connect()(DeviseUnlocksShow)
