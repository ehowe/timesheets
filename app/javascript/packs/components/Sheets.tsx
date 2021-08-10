import * as React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import Select from 'react-select'

import { PayPeriodT, ScheduleT } from '../model.types'

import { DispatchLoadingContext } from './LoadingProvider'
import { DispatchLoginContext } from './login/LoginProvider'
import Modal from './Modal'
import client from './client'

import {
  Button,
  Form,
  Nav,
  Row,
  Table,
} from 'react-bootstrap'

const Sheets: React.FC = () => {
  const dispatch = React.useContext(DispatchLoginContext)

  const setLoading = React.useContext(DispatchLoadingContext)
  const [sheets, setSheets] = React.useState([])
  const [payrollSchedules, setPayrollSchedules] = React.useState([])
  const [redirectToLogin, setRedirectToLogin] = React.useState(false)
  const [redirectToSheet, setRedirectToSheet] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [dateRanges, setDateRanges] = React.useState([])
  const [redirectSheet, setRedirectSheet] = React.useState(null)

  const NEW_TIMESHEET = {
    pay_period_id: '',
    payroll_schedule_id: '',
  }

  const reducer = (state, update) => ({...state, ...update})
  const [newTimesheet, dispatchTimesheet] = React.useReducer(reducer, NEW_TIMESHEET)

  const headerText = sheets.length > 0 ? 'Select a pay period' : 'No timesheets found'

  React.useEffect(() => {
    if (newTimesheet.payroll_schedule_id.length === 0) return

    client.request({ path: `/api/payroll_schedules/${newTimesheet.payroll_schedule_id}/pay_periods`, method: 'get' })
      .then(response => {
        setDateRanges(response.data.pay_periods.map((pay_period: PayPeriodT) => ({ label: `${pay_period.start_at} - ${pay_period.end_at}`, value: pay_period.id })))
      })
  }, [newTimesheet.payroll_schedule_id])

  const handleChange = (e: any): void => {
    dispatchTimesheet({ [e.target.name]: e.target.value })
  }

  const handlePayPeriodChange = (e: any): void => {
    dispatchTimesheet({ pay_period_id: e.value })
  }

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: `/api/timesheets`, method: 'get' })
      .then(response => {
        setLoading(false)
        setSheets(response.data.sheets)
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          dispatch({ type: 'logout' })
          dispatch({ type: 'alert', use: 'ALERT_ERROR', payload: 'Session expired' })
          setLoading(false)
          setRedirectToLogin(true)
        }
      })

    client.request({ path: '/api/payroll_schedules', method: 'get' })
      .then(response => {
        if (response.data.payroll_schedules.length > 0) {
          dispatchTimesheet({ payroll_schedule_id: response.data.payroll_schedules[0].id })
        }

        setPayrollSchedules(response.data.payroll_schedules)
      })
  }, [])

  const scheduleName = (schedule: ScheduleT) => {
    return `${schedule.start_day} ${schedule.start_time} - ${schedule.start_day} ${schedule.start_time} (${schedule.length_in_days} days)`
  }

  const handleSubmit = (): void => {
    setLoading(true)

    client.request({ path: '/api/timesheets', method: 'post', data: { timesheet: { pay_period_id: newTimesheet.pay_period_id } } })
      .then(response => {
        setRedirectSheet(response.data.id)
        setLoading(false)
        setOpen(false)
        setRedirectToSheet(true)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <Row>
      { redirectToLogin && <Redirect to="/users/sign_in" /> }
      { redirectToSheet && <Redirect to={{ pathname: `/sheets/${redirectSheet}`, state: { referrer: useLocation() } }} /> }
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
            <Form.Select onChange={handleChange} name="payroll_schedule_id" value={newTimesheet.payroll_schedule_id}>
              <option>Select a payroll schedule</option>
              { payrollSchedules.map((schedule: ScheduleT) => (
                <option key={schedule.id} value={schedule.id}>{scheduleName(schedule)}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date range in schedule</Form.Label>
            <Select onChange={handlePayPeriodChange} value={dateRanges.filter(range => range.value == newTimesheet.pay_period_id)} options={dateRanges} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={handleSubmit}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
    </Row>
  )
}

export default Sheets
