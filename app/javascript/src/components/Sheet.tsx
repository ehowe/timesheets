import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import * as dateFns from 'date-fns'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import { capitalize, uniqBy } from 'lodash'

import {
  Button,
  Form,
  Row,
  Table,
} from 'react-bootstrap'

import {
  EntryT,
  PayPeriodT,
  PayrollCategoryT,
} from '../model.types'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { SetExpiredLoginContext } from './ExpiredLoginProvider'
import CenterHeader from './CenterHeader'
import Modal from './Modal'

type StateT = {
  end_at?: Date,
  payroll_category_id?: number,
  start_at?: Date,
}

const Sheet: React.FC = () => {
  const { id } = ReactRouterDOM.useParams<{ id: string }>()
  const setLoading = React.useContext(DispatchLoadingContext)
  const handleErrorResponse = React.useContext<any>(SetExpiredLoginContext).handleErrorResponse

  const [entries, setEntries] = React.useState<Array<EntryT>>([])
  const [categories, setCategories] = React.useState<Array<PayrollCategoryT>>([])
  const [open, setOpen] = React.useState(false)
  const [formError, setFormError] = React.useState('')
  const [payPeriod, setPayPeriod] = React.useState<PayPeriodT>(null)

  const NEW_ENTRY: StateT = {}

  const reducer = (state: StateT, update: StateT) => ({...state, ...update})
  const [newEntry, dispatchEntry] = React.useReducer(reducer, NEW_ENTRY)

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: `/api/timesheets/${id}/entries`, method: 'get' })
      .then(response => {
        setEntries(response.data.entries)

        return client.request({ path: `/api/admin/payroll_categories`, method: 'get', params: { user_id: id } })
      })
      .then(response => {
        setCategories(response.data.payroll_categories)

        return client.request({ path: `/api/timesheets/${id}/pay_period`, method: 'get' })
      })
      .then(response => {
        setPayPeriod(response.data.pay_period)
      })
      .catch(error => {
        handleErrorResponse(error)
      })
      .finally(() => setLoading(false))
  }, [])

  const handlePayrollCategoryChange = (e: any): void => {
    dispatchEntry({ payroll_category_id: e.target.value })
  }

  const handleDateChange = ({ key, date }: { key: 'start_at' | 'end_at', date: Date }): void => {
    const currentDate = newEntry[key] || new Date()
    const newDate = date || new Date()
    const updatedDate = new Date(currentDate.getTime())

    updatedDate.setMonth(newDate.getMonth())
    updatedDate.setFullYear(newDate.getFullYear())
    updatedDate.setDate(newDate.getDate())

    dispatchEntry({ [key]: updatedDate })
  }

  const handleTimeChange = ({ key, time }: { key: 'start_at' | 'end_at', time: string }): void => {
    if (time === null) return

    const [hours, minutes] = time.split(":").map(n => parseInt(n))
    const date = newEntry[key] || new Date()

    date.setHours(hours)
    date.setMinutes(minutes)
    date.setSeconds(0)
    date.setMilliseconds(0)

    dispatchEntry({ [key]: date })
  }

  const handleSubmit = (): void => {
    setLoading(true)

    client.request({ path: `/api/timesheets/${id}/entries`, method: 'post', data: { entry: newEntry } })
      .then(response => {
        setEntries(uniqBy([ response.data.entry, ...entries ], 'id'))
        setOpen(false)
      })
      .catch(error => {
        handleErrorResponse(error)
        if (error.response) {
          setFormError(error.response.data.message)
        }
      })
      .finally(() => setLoading(false))
  }

  const submitDisabled = (): boolean => {
    if (Object.keys(newEntry).length === 0) return true

    if (Object.values(newEntry).some(value => value === undefined)) return true

    return Object.values(newEntry).filter(value => typeof value === 'string').some((value: any) => value.length === 0)
  }

  const disabledDates = ({ date }): boolean => {
    if (!payPeriod) {
      return false
    }

    const start = dateFns.parseISO(payPeriod.start)
    const end = dateFns.parseISO(payPeriod.end)

    start.setHours(0, 0, 0, 0)

    if (date < start || date > end) {
      return true
    }

    return false
  }

  return (
    <Row>
      <Table borderless hover responsive striped>
        <caption>Hours Logged</caption>
        <thead>
          <tr>
            { entries.length > 0
              ? (
                <React.Fragment>
                  <th>Start</th>
                  <th>End</th>
                  <th>Category</th>
                  <th>Length</th>
                </React.Fragment>
              ) : (
                <CenterHeader colSpan={4}>No Entries in this Timesheet</CenterHeader>
              )
            }
          </tr>
        </thead>
        <tbody>
          { entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.start_at}</td>
              <td>{entry.end_at}</td>
              <td>{entry.category}</td>
              <td>{capitalize(entry.length)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setOpen(true)}>Create new entry</Button>
      <Modal title="Add Entry" handleClose={() => setOpen(false)} show={open}>
        <Form>
          { formError.length > 0 && <p className="text-danger">{formError}</p> }
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <DatePicker onChange={(date: Date) => handleDateChange({ key: 'start_at', date })} value={newEntry.start_at} className="form-control start-date" name="start_date" tileDisabled={disabledDates} calendarType="US"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <TimePicker onChange={(time: string) => handleTimeChange({ key: 'start_at', time })} value={newEntry.start_at && dateFns.format(newEntry.start_at, 'HH:mm')} className="form-control start-time" name="start_time"/>
          </Form.Group>
          <Form.Group className="mt-1">
            <Form.Label>End Date</Form.Label>
            <DatePicker onChange={(date: Date) => handleDateChange({ key: 'end_at', date })} value={newEntry.end_at} className="form-control end-date" name="end_date" tileDisabled={disabledDates} calendarType="US"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <TimePicker onChange={(time: string) => handleTimeChange({ key: 'end_at', time })} value={newEntry.start_at && dateFns.format(newEntry.start_at, 'HH:mm')} className="form-control end-time" name="end_time"/>
          </Form.Group>
          <Form.Group className="mt-1">
            <Form.Label>Payroll Category</Form.Label>
            <Form.Select required onChange={handlePayrollCategoryChange} name="payroll_category_id" value={newEntry.payroll_category_id}>
              <option>{categories.length > 0 ? 'Select a payroll category' : 'User has no payroll categories'}</option>
              { categories.map((category: PayrollCategoryT) => <option key={category.id} value={category.id}>{category.name}</option>) }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={handleSubmit} disabled={submitDisabled()}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
    </Row>
  )
}

export default Sheet
