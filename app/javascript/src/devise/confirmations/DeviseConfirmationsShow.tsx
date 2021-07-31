import * as React from "react"
import { connect } from "react-redux"
import {
  Col,
  Row,
} from "react-bootstrap"

import confirmationActions from "./actions"

type PropsT = {
  dispatch: any,
  location: { search: any },
}

const DeviseConfirmationsShow: React.FC<PropsT> = (props: PropsT) => {
  React.useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)
    const token = urlParams.get("confirmation_token")

    props.dispatch(confirmationActions.confirm(token))
  }, [])

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Confirming your account ...</h2>
      </Col>
    </Row>
  )
}

export default connect()(DeviseConfirmationsShow)
