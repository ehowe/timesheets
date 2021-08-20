import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { capitalize } from 'lodash'

import {
  Button,
  Form,
  Row,
  Table,
} from 'react-bootstrap'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { DispatchLoginContext } from './login/LoginProvider'
import Modal from './Modal'

type EntryT = {
  category: string,
  end_at: string,
  id: number,
  start_at: string,
  length: string,
}

const Sheet: React.FC = () => {
  const { id } = ReactRouterDOM.useParams<{ id: string }>()
  const dispatch = React.useContext(DispatchLoginContext)

  const setLoading = React.useContext(DispatchLoadingContext)
  const [entries, setEntries] = React.useState<Array<EntryT>>([])
  const [redirect, setRedirect] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const NEW_ENTRY = {
    end_at: '',
    payroll_category_id: '',
    start_at: '',
  }

  const reducer = (state, update) => ({...state, ...update})
  const [newEntry, dispatchEntry] = React.useReducer(reducer, NEW_ENTRY)

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: `/api/timesheets/${id}/entries`, method: 'get' })
      .then(response => {
        setEntries(response.data.entries)
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

  const handleChange = (e: any): void => {
    dispatchEntry({ [e.target.name]: e.target.value })
  }

  const handlePayrollCategoryChange = (e: any): void => {
    dispatchEntry({ payroll_category_id: e.value })
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
      <Modal title="Add Entry" handleClose={() => setOpen(false)} show={open}>
        <Form>
          <Form.Group>
            <Form.Label>Payroll Category</Form.Label>
            <Form.Select onChange={handleChange} name="payroll_category_id" value={newEntry.payroll_schedule_id}>
              <option>Select a payroll schedule</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal>
    </Row>
  )
}

export default Sheet
