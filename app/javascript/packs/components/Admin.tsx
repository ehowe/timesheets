import * as React from 'react'
import { connect } from 'react-redux'

import {
  Container,
} from 'react-bootstrap'

const Admin: React.FC = () => {
  return (
    <Container>
      <div>Admin</div>
    </Container>
  )
}

export default connect()(Admin)
