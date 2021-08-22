import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import * as dateFns from 'date-fns'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import { Redirect } from 'react-router-dom'
import { capitalize } from 'lodash'

import {
  Button,
  Form,
  Row,
  Table,
} from 'react-bootstrap'

import { PayrollCategoryT, EntryT } from '../model.types'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { DispatchLoginContext } from './login/LoginProvider'
import Modal from './Modal'

type StateT = {
  end_at?: Date,
  payroll_category_id?: number,
  start_at?: Date,
}

const Sheet: React.FC = () => {
  const { id } = ReactRouterDOM.useParams<{ id: string }>()
  const dispatch = React.useContext(DispatchLoginContext)
  const setLoading = React.useContext(DispatchLoadingContext)

  const [entries, setEntries] = React.useState<Array<EntryT>>([])
  const [categories, setCategories] = React.useState<Array<PayrollCategoryT>>([])
  const [redirect, setRedirect] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const NEW_ENTRY: StateT = {}

  const reducer = (state: StateT, update: StateT) => ({...state, ...update})
  const [newEntry, dispatchEntry] = React.useReducer(reducer, NEW_ENTRY)

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: `/api/timesheets/${id}/entries`, method: 'get' })
      .then(response => {
        setEntries(response.data.entries)

        return client.request({ path: `/api/admin/payroll_categories`, method: 'get' })
      })
      .then(response => {
        setCategories(response.data.payroll_categories)
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          dispatch({ type: 'logout' })
          dispatch({ type: 'alert', use: 'ALERT_ERROR', payload: 'Session expired' })
          setRedirect(true)
        }
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

    dispatchEntry({ [key]: date })
  }

  const handleSubmit = (): void => {
    setLoading(true)

    client.request({ path: `/api/timesheets/${id}/entries`, method: 'post', data: { entry: { newEntry } } })
      .then(response => {
        setEntries([ response.data.entry, ...entries ])
        setOpen(false)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  const submitDisabled = (): boolean => {
    if (Object.keys(newEntry).length === 0) return true

    if (Object.values(newEntry).some(value => value === undefined)) return true

    return Object.values(newEntry).filter(value => typeof value === 'string').some((value: any) => value.length === 0)
  }

  // const dateToTimeString = (isoString: string): string => {
  //   if (isoString.length === 0) {
  //     return ""
  //   }

  //   return dateFns.format(dateFns.parseISO(isoString), 'yyyy-MM-dd HH:mm')
  // }

  return (
    <Row>
      { redirect && <Redirect to="/users/sign_in" /> }
      <Table borderless hover responsive striped>
        <caption>Hours Logged</caption>
        { entries.length > 0 && (
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
              <th>Category</th>
              <th>Length</th>
            </tr>
          </thead>
        )}
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
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <DatePicker onChange={(date: Date) => handleDateChange({ key: 'start_at', date })} value={newEntry.start_at} className="form-control"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <TimePicker onChange={(time: string) => handleTimeChange({ key: 'start_at', time })} value={newEntry.start_at && dateFns.format(newEntry.start_at, 'HH:mm')} className="form-control"/>
          </Form.Group>
          <Form.Group className="mt-1">
            <Form.Label>End Date</Form.Label>
            <DatePicker onChange={(date: Date) => handleDateChange({ key: 'end_at', date })} value={newEntry.end_at} className="form-control"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <TimePicker onChange={(time: string) => handleTimeChange({ key: 'end_at', time })} value={newEntry.start_at && dateFns.format(newEntry.start_at, 'HH:mm')} className="form-control"/>
          </Form.Group>
          <Form.Group className="mt-1">
            <Form.Label>Payroll Category</Form.Label>
            <Form.Select required onChange={handlePayrollCategoryChange} name="payroll_category_id" value={newEntry.payroll_category_id}>
              <option>Select a payroll category</option>
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
