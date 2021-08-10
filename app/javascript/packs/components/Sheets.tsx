import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'

import { ScheduleT } from '../model.types'

import { DispatchLoadingContext } from './LoadingProvider'
import { DispatchLoginContext, LoginContext } from './login/LoginProvider'
import Modal from './Modal'
import client from './client'

import {
  Button,
  Container,
  Form,
  Nav,
  Table,
} from 'react-bootstrap'

const Sheets: React.FC = () => {
  const { user } = React.useContext(LoginContext)
  const dispatch = React.useContext(DispatchLoginContext)

  const setLoading = React.useContext(DispatchLoadingContext)
  const [sheets, setSheets] = React.useState([])
  const [payrollSchedules, setPayrollSchedules] = React.useState([])
  const [redirect, setRedirect] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [dateRanges, setDateRanges] = React.useState([])

  const NEW_TIMESHEET = {
    pay_period: '',
    payroll_schedule: '',
  }

  const reducer = (state, update) => ({...state, ...update})
  const [newTimesheet, dispatchTimesheet] = React.useReducer(reducer, NEW_TIMESHEET)

  const headerText = sheets.length > 0 ? 'Select a pay period' : 'No timesheets found'

  React.useEffect(() => {
    if (newTimesheet.payroll_schedule.length === 0) return

    client.request({ path: `/api/payroll_schedules/${newTimesheet.payroll_schedule}/date_ranges`, method: 'get' })
      .then(response => {
        setDateRanges(response.data.ranges.map((range: string) => ({ label: range, value: range })))
      })
  }, [newTimesheet.payroll_schedule])

  const handleChange = (e: any): void => {
    dispatchTimesheet({ [e.target.name]: e.target.value })
  }

  const handlePayPeriodChange = (e: any): void => {
    dispatchTimesheet({ pay_period: e.value })
  }

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: `/api/users/${user.id}/timesheets`, method: 'get' })
      .then(response => {
        setLoading(false)
        setSheets(response.data.sheets)
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          dispatch({ type: 'logout' })
          dispatch({ type: 'alert', use: 'ALERT_ERROR', payload: 'Session expired' })
          setLoading(false)
          setRedirect(true)
        }
      })

    client.request({ path: '/api/payroll_schedules', method: 'get' })
      .then(response => {
        if (response.data.payroll_schedules.length > 0) {
          dispatchTimesheet({ payroll_schedule: response.data.payroll_schedules[0].id })
        }

        setPayrollSchedules(response.data.payroll_schedules)
      })
  }, [])

  const scheduleName = (schedule: ScheduleT) => {
    return `${schedule.start_day} ${schedule.start_time} - ${schedule.start_day} ${schedule.start_time} (${schedule.length_in_days} days)`
  }

  const handleSubmit = (): void => {
    console.log(newTimesheet)
  }

  return (
    <Container>
      { redirect && <Redirect to="/users/sign_in" /> }
      <Table borderless hover responsive striped>
        <thead>
          <tr>
            <th className="timesheetHeader">{headerText}</th>
          </tr>
        </thead>
        <tbody>
          { sheets.map(sheet => (
            <tr key={sheet.id}>
              <td>
                <Nav.Link href={`/timesheets/${sheet.id}`}>{sheet.name}</Nav.Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setOpen(true)}>Create new timesheet</Button>
      <Modal title="Create Timesheet" handleClose={() => setOpen(false)} show={open}>
        <Form>
          <Form.Group>
            <Form.Label>Payroll Schedule</Form.Label>
            <Form.Select onChange={handleChange} name="payroll_schedule" value={newTimesheet.payroll_schedule}>
              <option>Select a payroll schedule</option>
              { payrollSchedules.map((schedule: ScheduleT) => (
                <option key={schedule.id} value={schedule.id}>{scheduleName(schedule)}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date range in schedule</Form.Label>
            <Select onChange={handlePayPeriodChange} value={dateRanges.filter(range => range.value == newTimesheet.pay_period)} options={dateRanges} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={handleSubmit}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
    </Container>
  )
}

export default Sheets
