import * as React from 'react'

import {
  Tab,
  Tabs,
} from 'react-bootstrap'

import AdminPayrollCategories from './AdminPayrollCategories'
import AdminPayrollSchedules from './AdminPayrollSchedules'
import AdminTimesheets from './AdminTimesheets'
import AdminUsers from './AdminUsers'

const Admin: React.FC = () => {
  return (
    <React.Fragment>
      <Tabs defaultActiveKey="timesheets">
        <Tab eventKey="timesheets" title="Timesheets" mountOnEnter>
          <AdminTimesheets />
        </Tab>
        <Tab eventKey="payrollCategories" title="Payroll Categories" mountOnEnter>
          <AdminPayrollCategories />
        </Tab>
        <Tab eventKey="payrollSchedules" title="Payroll Schedules" mountOnEnter>
          <AdminPayrollSchedules />
        </Tab>
        <Tab eventKey="users" title="Users" mountOnEnter>
          <AdminUsers />
        </Tab>
      </Tabs>
    </React.Fragment>
  )
}

export default Admin
