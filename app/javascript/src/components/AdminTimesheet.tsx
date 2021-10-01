import * as React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import {
  Badge,
  Row,
  Table,
} from 'react-bootstrap'

import { AdminTimesheetT } from '../model.types'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { SetExpiredLoginContext } from './ExpiredLoginProvider'

interface StateT {
  end_at: string
  entries: Array<AdminTimesheetT>
  start_at: string
}

const INIT_STATE: StateT = {
  end_at: '',
  entries: [],
  start_at: '',
}

const AdminTimesheet: React.FC = () => {
  const reducer = (state: StateT, update: StateT) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE)

  const setLoading = React.useContext(DispatchLoadingContext)
  const handleErrorResponse = React.useContext<any>(SetExpiredLoginContext).handleErrorResponse

  const { id } = useParams<{ id?: string }>()

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: `/api/admin/pay_periods/${id}`, method: 'get' })
      .then(response => {
        console.log(response.data)
        dispatch(response.data.pay_period)
      })
      .catch(error => handleErrorResponse(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Row className="m-3">
      <Dates>
        <Start>
          <strong>Pay Period Start:&nbsp;</strong><Badge bg="secondary">{state.start_at}</Badge>
        </Start>
        <End>
          <strong>Pay Period End:&nbsp;</strong><Badge bg="secondary">{state.end_at}</Badge>
        </End>
      </Dates>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Length in Hours</th>
            <th>Payroll Category</th>
          </tr>
        </thead>
        <tbody>
          { state.entries.map((entry: AdminTimesheetT) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.start_at}</td>
              <td>{entry.end_at}</td>
              <td>{entry.length_in_hours}</td>
              <td>{entry.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  )
}

const Dates = styled.div`
display: flex;
padding-left: 0;
`

const Start = styled.div`
align-items: center;
display: flex;
justify-content: left;
`

const End = styled.div`
align-items: center;
display: flex;
flex: 1;
justify-content: end;
`

export default AdminTimesheet
