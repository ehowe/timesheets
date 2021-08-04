import * as React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { DispatchLoadingContext } from './LoadingProvider'
import { DispatchLoginContext, LoginContext } from './login/LoginProvider'

import {
  Container,
  Nav,
  Table,
} from 'react-bootstrap'

const Sheets: React.FC = () => {
  const { user } = React.useContext(LoginContext)
  const dispatch = React.useContext(DispatchLoginContext)

  const setLoading = React.useContext(DispatchLoadingContext)
  const [sheets, setSheets] = React.useState([])
  const [redirect, setRedirect] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)

    axios.get(`/api/users/${user.id}/timesheets`, { params: { token: user.token } })
      .then(response => {
        setLoading(false)
        setSheets(response.data.sheets)
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          dispatch({ type: 'logout' })
          dispatch({ type: 'alert', use: 'ALERT_ERROR', payload: 'Token expired' })
          setLoading(false)
          setRedirect(true)
        }
      })
  }, [])

  return (
    <Container>
      { redirect && <Redirect to="/users/sign_in" /> }
      <Table borderless hover responsive striped>
        { sheets.length > 0 && (
          <thead>
            <tr>
              <th className="timesheetHeader">Select a pay sheet</th>
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

export default Sheets
