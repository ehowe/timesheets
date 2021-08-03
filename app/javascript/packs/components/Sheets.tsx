import * as React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import type { UserT } from '../model.types'

import { DispatchLoadingContext } from './LoadingProvider'

import {
  Container,
  Nav,
  Table,
} from 'react-bootstrap'

type PropsT = {
  user: UserT,
}

const Sheets: React.FC<PropsT> = (props: PropsT) => {
  const { user } = props

  const dispatchLoading = React.useContext(DispatchLoadingContext)
  const [sheets, setSheets] = React.useState([])

  React.useEffect(() => {
    dispatchLoading(true)

    axios.get(`/api/users/${user.id}/timesheets`, { params: { token: user.token } })
      .then(response => {
        dispatchLoading(false)
        setSheets(response.data.sheets)
      })
  }, [])

  return (
    <Container>
      <Table borderless hover responsive striped>
        { sheets.length > 0 && (
          <thead>
            <tr>
              <th className="timesheetHeader">Select a timesheet</th>
            </tr>
          </thead>
        )}
        <tbody>
          { sheets.map(sheet => (
            <tr key={sheet.id}>
              <td>
                <Nav.Link href={`/timesheets/${sheet.id}`}>{sheet.name}</Nav.Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

function mapStateToProps(state) {
  const { user } = state.authentication
  return { user }
}

export default connect(mapStateToProps)(Sheets)
