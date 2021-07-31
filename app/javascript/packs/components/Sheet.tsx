import * as React from "react"
import * as ReactRouterDOM from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"

import type { UserT } from "../model.types"

import {
  Container,
  Spinner,
  Table,
} from "react-bootstrap"

import { DispatchLoadingContext } from "./LoadingProvider"

type PropsT = {
  user: UserT,
}

const Sheet: React.FC<PropsT> = (props: PropsT) => {
  const { id } = ReactRouterDOM.useParams()
  const { user } = props

  const dispatchLoading = React.useContext(DispatchLoadingContext)
  const [entries, setEntries] = React.useState([])

  React.useEffect(() => {
    dispatchLoading(true)

    axios.get(`/api/users/${user.id}/timesheets/${id}/entries`, { params: { token: user.token } })
      .then(response => {
        dispatchLoading(false)
        setEntries(response.data.entries)
      })
  }, [])

  return (
    <Container>
      <Table borderless hover responsive striped>
        <caption>Hours Logged</caption>
        { entries.length > 0 && (
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
              <th>Category</th>
            </tr>
          </thead>
        )}
        <tbody>
          { entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.start_at}</td>
              <td>{entry.end_at}</td>
              <td>{entry.category}</td>
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

export default connect(mapStateToProps)(Sheet)
