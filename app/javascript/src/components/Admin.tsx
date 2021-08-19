import * as React from 'react'

import {
  Container,
  Tab,
  Tabs,
} from 'react-bootstrap'

import AdminPayroll from './AdminPayroll'
import AdminUsers from './AdminUsers'

const Admin: React.FC = () => {
  return (
    <Container>
      <Tabs defaultActiveKey="payroll">
        <Tab eventKey="payroll" title="Payroll" mountOnEnter>
          <AdminPayroll />
        </Tab>
        <Tab eventKey="users" title="Users" mountOnEnter>
          <AdminUsers />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default Admin