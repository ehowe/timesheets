import * as React from 'react'
import TimezoneSelect, { i18nTimezones } from 'react-timezone-select'

import {
  Button,
  Form,
  Row,
  Table,
} from 'react-bootstrap'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import Modal from './Modal'

type StateT = {
  length_in_days?: number,
  start_date?: string,
  start_time?: string,
  timezone?: string,
}

const AdminPayroll: React.FC = () => {
  const setLoading = React.useContext(DispatchLoadingContext)
  const [open, setOpen] = React.useState(false)
  const [schedules, setSchedules] = React.useState([])
  const [formError, setFormError] = React.useState(false)

  const INIT_STATE: StateT = {
    length_in_days: 7,
    start_date: '',
    start_time: '',
    timezone: '',
  }

  const reducer = (state: StateT, update: StateT) => ({...state, ...update})
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ [e.target.name]: e.target.value })
  }

  const handleTimezoneChange = ({ value }: { value: string }) => {
    dispatch({ timezone: value })
  }

  const handleSubmit = () => {
    setLoading(true)

    client.request({ path: '/api/admin/payroll_schedules', method: 'post', data: { payroll_schedule: state } })
      .then(response => {
        setOpen(false)
        setLoading(false)
        setSchedules([...schedules, response.data.schedule])
      })
      .catch(error => {
        console.log(error)
        setFormError(true)
        setLoading(false)
      })
  }

  React.useEffect(() => {
    client.request({ path: '/api/admin/payroll_schedules', method: 'get' })
      .then(response => setSchedules(response.data.payroll_schedules))
  }, [])

  return (
    <Row className="m-3">
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
          { formError && <p className="text-danger">There was an error completing this request. Please try again</p> }
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" name="start_date" onChange={handleChange} value={state.start_date}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <Form.Control type="time" name="start_time" onChange={handleChange} value={state.start_time} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Length in days</Form.Label>
            <Form.Control type="number" name="length_in_days" onChange={handleChange} value={state.length_in_days} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Timezone</Form.Label>
            <TimezoneSelect
              value={state.timezone}
              onChange={handleTimezoneChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={handleSubmit}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
    </Row>
  )
}

export default AdminPayroll
