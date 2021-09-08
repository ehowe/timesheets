import * as React from 'react'
import Select from 'react-select'
import { uniqBy } from 'lodash'

import { PayPeriodT, ScheduleT } from '../model.types'

import { DispatchLoadingContext } from './LoadingProvider'
import { SetExpiredLoginContext } from './ExpiredLoginProvider'
import Modal from './Modal'
import client from './client'

import {
  Button,
  Form,
  Nav,
  Row,
  Table,
} from 'react-bootstrap'

type StateT = {
  pay_period_id?: number,
  payroll_schedule_id?: number,
}

const Sheets: React.FC = () => {
  const handleErrorResponse = React.useContext<any>(SetExpiredLoginContext).handleErrorResponse

  const setLoading = React.useContext(DispatchLoadingContext)
  const [sheets, setSheets] = React.useState([])
  const [payrollSchedules, setPayrollSchedules] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [dateRanges, setDateRanges] = React.useState([])
  const [payrollScheduleOptions, setPayrollScheduleOptions] = React.useState<Array<{ label: string, value: number }>>([])

  const reducer = (state: StateT, update: StateT) => ({...state, ...update})
  const [newTimesheet, dispatchTimesheet] = React.useReducer(reducer, {})

  const headerText = sheets.length > 0 ? 'Select a pay period' : 'No timesheets found'

  React.useEffect(() => {
    if (!newTimesheet.payroll_schedule_id) return

    client.request({ path: `/api/payroll_schedules/${newTimesheet.payroll_schedule_id}/pay_periods`, method: 'get' })
      .then(response => {
        setDateRanges(response.data.pay_periods.map((pay_period: PayPeriodT) => ({ label: `${pay_period.start_at} - ${pay_period.end_at}`, value: pay_period.id })))
      })
      .catch((error: any) => {
        handleErrorResponse(error)
      })
  }, [newTimesheet.payroll_schedule_id])

  React.useEffect(() => {
    if (payrollSchedules.length > 0) {
      dispatchTimesheet({ payroll_schedule_id: payrollSchedules[0].id })

      setPayrollScheduleOptions(payrollSchedules.map(schedule => ({ label: scheduleName(schedule), value: schedule.id }) ))
    }

  }, [payrollSchedules])

  const handlePayrollScheduleChange = (e: any): void => {
    dispatchTimesheet({ payroll_schedule_id: e.value })
  }

  const handlePayPeriodChange = (e: any): void => {
    dispatchTimesheet({ pay_period_id: e.value })
  }

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: `/api/timesheets`, method: 'get' })
      .then(response => {
        setSheets(response.data.sheets)
      })
      .catch(error => handleErrorResponse(error))
      .finally(() => setLoading(false))

    client.request({ path: '/api/payroll_schedules', method: 'get' })
      .then(response => {
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
        setSheets(uniqBy([...sheets, response.data.sheet], 'id'))
        setOpen(false)
      })
      .catch(error => {
        handleErrorResponse(error)
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Row>
      <Table borderless hover responsive striped className="timesheets">
        <thead>
          <tr>
            <th className="timesheetHeader">{headerText}</th>
          </tr>
        </thead>
        <tbody>
          { sheets.map(sheet => (
            <tr key={sheet.id} className="sheet-row">
              <td className="sheet-name">
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
            <Select onChange={handlePayrollScheduleChange} value={payrollScheduleOptions.filter(schedule => schedule.value === newTimesheet.payroll_schedule_id)} options={payrollScheduleOptions} name="payroll_schedule" classNamePrefix="payroll-schedule"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date range in schedule</Form.Label>
            <Select onChange={handlePayPeriodChange} value={dateRanges.filter(range => range.value === newTimesheet.pay_period_id)} options={dateRanges} name="pay_period" classNamePrefix="pay-period"/>
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
