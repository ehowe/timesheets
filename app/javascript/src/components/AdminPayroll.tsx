import * as React from 'react'
import TimezoneSelect from 'react-timezone-select'
import { sortBy } from 'lodash'

import {
  Button,
  Form,
  Row,
  Table,
} from 'react-bootstrap'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import Modal from './Modal'

type ScheduleStateT = {
  length_in_days?: number,
  start_date?: string,
  start_time?: string,
  timezone?: string,
}

type CategoryStateT = {
  name?: string,
}

const AdminPayroll: React.FC = () => {
  const setLoading = React.useContext(DispatchLoadingContext)
  const [addScheduleOpen, setAddScheduleOpen] = React.useState(false)
  const [addCategoryOpen, setAddCategoryOpen] = React.useState(false)
  const [schedules, setSchedules] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [scheduleFormError, setScheduleFormError] = React.useState('')
  const [categoryFormError, setCategoryFormError] = React.useState('')

  const INIT_SCHEDULE_STATE: ScheduleStateT = {
    length_in_days: 7,
    start_date: '',
    start_time: '',
    timezone: '',
  }

  const INIT_CATEGORY_STATE: CategoryStateT = {
    name: '',
  }

  const scheduleReducer = (scheduleState: ScheduleStateT, update: ScheduleStateT) => ({...scheduleState, ...update})
  const [scheduleState, scheduleDispatch] = React.useReducer(scheduleReducer, INIT_SCHEDULE_STATE)

  const categoryReducer = (state: CategoryStateT, update: CategoryStateT) => ({...state, ...update})
  const [categoryState, dispatchCategory] = React.useReducer(categoryReducer, INIT_CATEGORY_STATE)

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    scheduleDispatch({ [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchCategory({ [e.target.name]: e.target.value })
  }

  const handleTimezoneChange = ({ value }: { value: string }) => {
    scheduleDispatch({ timezone: value })
  }

  const scheduleSubmit = () => {
    setLoading(true)

    client.request({ path: '/api/admin/payroll_schedules', method: 'post', data: { payroll_schedule: scheduleState } })
      .then(response => {
        setAddScheduleOpen(false)
        setSchedules([...schedules, response.data.schedule])
      })
      .catch(error => {
        console.log(error)
        setScheduleFormError(error.response.data)
      })
      .finally(() => setLoading(false))
  }

  const categorySubmit = () => {
    setLoading(true)

    client.request({ path: '/api/admin/payroll_categories', method: 'post', data: { payroll_category: categoryState } })
      .then(response => {
        const newCategories = sortBy([...categories, response.data.payroll_category], (c: { name: string }) => c.name)

        setCategories(newCategories)
        setAddCategoryOpen(false)
      })
      .catch(error => {
        setCategoryFormError(error.response.data)
      })
      .finally(() => setLoading(false))
  }

  React.useEffect(() => {
    client.request({ path: '/api/admin/payroll_schedules', method: 'get' })
      .then(response => setSchedules(response.data.payroll_schedules))

    client.request({ path: '/api/admin/payroll_categories', method: 'get' })
      .then(response => {
        setCategories(response.data.payroll_categories)
      })
  }, [])

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
      <Button variant="primary" onClick={() => setAddScheduleOpen(true)}>Create new schedule</Button>
      <hr className="mt-3"/>
      <h3>Payroll Categories</h3>
      <Table borderless hover responsive striped>
        <caption>Payroll categories</caption>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          { categories.length == 0
            ? <tr><td>No categories found</td></tr>
            : categories.map(category => <tr><td key={category.name}>{category.name}</td></tr>)
          }
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setAddCategoryOpen(true)}>Create new payroll category</Button>
      <Modal title="Create Schedule" handleClose={() => setAddScheduleOpen(false)} show={addScheduleOpen}>
        <Form>
          { scheduleFormError.length > 0 && <p className="text-danger">There was an error completing this request: {scheduleFormError}</p> }
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" name="start_date" onChange={handleScheduleChange} value={scheduleState.start_date}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <Form.Control type="time" name="start_time" onChange={handleScheduleChange} value={scheduleState.start_time} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Length in days</Form.Label>
            <Form.Control type="number" name="length_in_days" onChange={handleScheduleChange} value={scheduleState.length_in_days} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Timezone</Form.Label>
            <TimezoneSelect
              value={scheduleState.timezone}
              onChange={handleTimezoneChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={scheduleSubmit}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
      <Modal title="Create Payroll Category" handleClose={() => setAddCategoryOpen(false)} show={addCategoryOpen}>
        <Form>
          { categoryFormError.length > 0 && <p className="text-danger">There was an error completing this request: {categoryFormError}</p>}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleCategoryChange} value={categoryState.name} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={categorySubmit}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
    </Row>
  )
}

export default AdminPayroll
