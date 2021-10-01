import * as React from 'react'
import { useHistory } from 'react-router-dom'

import {
  Row,
  Table,
} from 'react-bootstrap'

import client from './client'
import { PayPeriodT } from '../model.types'
import { DispatchLoadingContext } from './LoadingProvider'
import { SetExpiredLoginContext } from './ExpiredLoginProvider'
import Pagination from './Pagination'

const AdminTimesheets: React.FC = () => {
  const history = useHistory()
  const setLoading = React.useContext(DispatchLoadingContext)
  const handleErrorResponse = React.useContext<any>(SetExpiredLoginContext).handleErrorResponse

  const [payPeriods, setPayperiods] = React.useState([])

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: '/api/admin/pay_periods', method: 'get' })
      .then(response => setPayperiods(response.data.pay_periods))
      .catch(error => handleErrorResponse(error))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (id: number) => {
    history.push(`/admin/timesheets/${id}`)
  }

  return (
    <Row className="m-3" id="adminTimesheetsRow">
      <h3>Timesheets</h3>

      <Table borderless hover responsive striped>
        <thead>
          <tr>
            <th>Pay Period Start</th>
            <th>Pay Period End</th>
            <th>Length in Days</th>
          </tr>
        </thead>
        <tbody>
          { payPeriods.length > 0
            ? (
              <Pagination
                items={payPeriods}
                navElement="#adminTimesheetsRow"
                render={(payPeriod: PayPeriodT) => (
                  <tr key={payPeriod.id} onClick={() => handleRowClick(payPeriod.id)}>
                    <td>{payPeriod.start_at}</td>
                    <td>{payPeriod.end_at}</td>
                    <td>{payPeriod.length_in_days}</td>
                  </tr>
                )}
              />
            ) : (
              <tr>
                <td colSpan={3}>No pay periods found</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Row>
  )
}

export default AdminTimesheets
