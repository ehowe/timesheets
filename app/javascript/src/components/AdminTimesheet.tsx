import * as React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import {
  Badge,
  Row,
} from 'react-bootstrap'

import { AdminTimesheetT } from '../model.types'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { SetExpiredLoginContext } from './ExpiredLoginProvider'
import Table from './Table'

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
      .then(response => dispatch(response.data.pay_period))
      .catch(error => handleErrorResponse(error))
      .finally(() => setLoading(false))
  }, [])

  const tableFields = [
    { name: 'Name', attr: 'name', sortable: true },
    { name: 'Start', attr: 'start_at', sortable: true },
    { name: 'End', attr: 'end_at', sortable: true },
    { name: 'Length in Hours', attr: 'length_in_hours' },
    { name: 'Payroll Category', attr: 'category', sortable: true },
  ]

  return (
    <Row className="m-3">
      <Header>
        <Start>
          <strong>Pay Period Start:&nbsp;</strong><Badge bg="secondary">{state.start_at}</Badge>
        </Start>
        <End>
          <strong>Pay Period End:&nbsp;</strong><Badge bg="secondary">{state.end_at}</Badge>
        </End>
      </Header>
      <Table
        defaultSort="start_at"
        exportInfo={{ allowed: true, fileName: state.start_at, text: 'Export to Excel' }}
        fields={tableFields}
        items={state.entries}
      />
    </Row>
  )
}

const Header = styled.div`
display: flex;
min-width: 30%;
padding-left: 0;
`

const Start = styled.div`
align-items: center;
display: flex;
justify-content: left;
min-width: 40%;
`

const End = styled.div`
align-items: center;
display: flex;
flex: 1;
justify-content: end;
`

export default AdminTimesheet
