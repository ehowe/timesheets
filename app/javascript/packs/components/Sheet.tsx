import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { capitalize } from 'lodash'

import {
  Container,
  Table,
} from 'react-bootstrap'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { DispatchLoginContext } from './login/LoginProvider'

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

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: `/api/timesheets/${id}/entries`, method: 'get' })
      .then(response => {
        setLoading(false)
        setEntries(response.data.entries)
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          dispatch({ type: 'logout' })
          dispatch({ type: 'alert', use: 'ALERT_ERROR', payload: 'Session expired' })
          setLoading(false)
          setRedirect(true)
        }
      })
  }, [])

  return (
    <Container>
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
    </Container>
  )
}

export default Sheet
