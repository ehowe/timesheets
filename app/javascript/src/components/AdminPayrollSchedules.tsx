import * as React from 'react'
import * as dateFns from 'date-fns'
import TimezoneSelect from 'react-timezone-select'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import { sortBy } from 'lodash'

import {
  Button,
  Form,
  Row,
  Table,
} from 'react-bootstrap'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { SetExpiredLoginContext } from './ExpiredLoginProvider'
import Modal from './Modal'

type StateT = {
  length_in_days?: number,
  start_at?: Date,
  timezone?: string,
}

const AdminPayrollSchedules: React.FC = () => {
  const handleErrorResponse = React.useContext<any>(SetExpiredLoginContext).handleErrorResponse

  const setLoading = React.useContext(DispatchLoadingContext)
  const [open, setOpen] = React.useState(false)
  const [schedules, setSchedules] = React.useState([])
  const [formError, setFormError] = React.useState('')

  const INIT_STATE: StateT = {
    length_in_days: 7,
    timezone: '',
  }

  const reducer = (state: StateT, update: StateT) => ({...state, ...update})
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE)

  const handleDateChange = ({ key, date }: { key: 'start_at' | 'end_at', date: Date }): void => {
    const currentDate = state[key] || new Date()
    const newDate = date || new Date()
    const updatedDate = new Date(currentDate.getTime())

    updatedDate.setMonth(newDate.getMonth())
    updatedDate.setFullYear(newDate.getFullYear())
    updatedDate.setDate(newDate.getDate())

    dispatch({ [key]: updatedDate })
  }

  const handleTimeChange = ({ key, time }: { key: 'start_at' | 'end_at', time: string }): void => {
    if (time === null) return

    const [hours, minutes] = time.split(":").map(n => parseInt(n))
    const date = state[key] || new Date()

    date.setHours(hours)
    date.setMinutes(minutes)

    dispatch({ [key]: date })
  }

  const handleTimezoneChange = ({ value }: { value: string }) => {
    dispatch({ timezone: value })
  }

  const submit = () => {
    setLoading(true)

    const payroll_schedule = {
      length_in_days: state.length_in_days,
      start_date: dateFns.format(state.start_at, 'yyyy-MM-dd'),
      start_time: dateFns.format(state.start_at, 'HH:mm'),
      timezone: state.timezone,
    }

    client.request({ path: '/api/admin/payroll_schedules', method: 'post', data: { payroll_schedule } })
      .then(response => {
        setOpen(false)
        setSchedules([...schedules, response.data.schedule])
      })
      .catch(error => {
        handleErrorResponse(error)
        console.log(error)
        setFormError(error.response.data)
      })
      .finally(() => setLoading(false))
  }

  React.useEffect(() => {
    client.request({ path: '/api/admin/payroll_schedules', method: 'get' })
      .then(response => setSchedules(response.data.payroll_schedules))
      .catch(error => handleErrorResponse(error))
  }, [])

  const submitDisabled = (): boolean => {
    if (Object.keys(state).length === 0) return true

    if (Object.values(state).some(value => value === undefined)) return true

    return Object.values(state).filter(value => typeof value === 'string').some((value: any) => value.length === 0)
  }

  return (
    <Row className="m-3">
      <h3>Payroll Schedules</h3>
      <p>Payroll schedules are repeating time periods that users can associate their timesheets with. Most organizations will only need a single payroll schedule.</p>
      <Table borderless hover responsive striped>
        <caption>Payroll schedules</caption>
        <thead>
          <tr>
            <th>Start Day</th>
            <th>Start Time of each pay period</th>
            <th>Timezone</th>
            <th>Schedule started on</th>
            <th>Length of each pay period</th>
          </tr>
        </thead>
        <tbody>
          { schedules.length == 0
            ? <tr><td colSpan={5}>No schedules found</td></tr>
            : schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.start_day}</td>
                <td>{schedule.start_time}</td>
                <td>{schedule.timezone}</td>
                <td>{schedule.start_date}</td>
                <td>{schedule.length_in_days} days</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setOpen(true)}>Create new schedule</Button>
      <Modal title="Create Schedule" handleClose={() => setOpen(false)} show={open}>
        <Form>
          { formError.length > 0 && <p className="text-danger">There was an error completing this request: {formError}</p> }
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <DatePicker onChange={(date: Date) => handleDateChange({ key: 'start_at', date })} value={state.start_at} className="form-control"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <TimePicker onChange={(time: string) => handleTimeChange({ key: 'start_at', time })} value={state.start_at && dateFns.format(state.start_at, 'HH:mm')} className="form-control"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Length in days</Form.Label>
            <Form.Control type="number" name="length_in_days" onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ length_in_days: parseInt(e.target.value) })} value={state.length_in_days} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Timezone</Form.Label>
            <TimezoneSelect
              value={state.timezone}
              onChange={handleTimezoneChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={submit} disabled={submitDisabled()}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
    </Row>
  )
}

export default AdminPayrollSchedules
