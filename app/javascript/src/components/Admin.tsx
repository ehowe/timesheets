import * as React from 'react'
import { useLocation } from 'react-router-dom'

import {
  LinkContainer,
} from 'react-router-bootstrap'

import {
  Nav,
  Tab,
} from 'react-bootstrap'

import AdminPayrollCategories from './AdminPayrollCategories'
import AdminPayrollSchedules from './AdminPayrollSchedules'
import AdminTimesheets from './AdminTimesheets'
import AdminUsers from './AdminUsers'

const Admin: React.FC = () => {
  const location = useLocation()
  const pathParts = location.pathname.split('/')
  const activeTab = pathParts[pathParts.length - 1]

  return (
    <React.Fragment>
      <Tab.Container activeKey={activeTab}>
        <Nav variant="tabs">
          <Nav.Item>
            <LinkContainer exact to="/admin/timesheets">
              <Nav.Link eventKey="timesheets">Timesheets</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer exact to="/admin/payroll_categories">
              <Nav.Link eventKey="payrollCategories">Payroll Categories</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer exact to="/admin/payroll_schedules">
              <Nav.Link eventKey="payrollSchedules">Payroll Schedules</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer exact to="/admin/users">
              <Nav.Link eventKey="users">Users</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="timesheets" mountOnEnter>
            <AdminTimesheets />
          </Tab.Pane>
          <Tab.Pane eventKey="payroll_categories" mountOnEnter>
            <AdminPayrollCategories />
          </Tab.Pane>
          <Tab.Pane eventKey="payroll_schedules" mountOnEnter>
            <AdminPayrollSchedules />
          </Tab.Pane>
          <Tab.Pane eventKey="users" mountOnEnter>
            <AdminUsers />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </React.Fragment>
  )
}

export default Admin
