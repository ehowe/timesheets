import * as React from 'react'
import { LockFill, UnlockFill } from 'react-bootstrap-icons'

import { UserT } from '../model.types'

import {
  Button,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { LoginContext } from './login/LoginProvider'
import Modal from './Modal'

const AdminUsers: React.FC = () => {
  const { user: admin } = React.useContext(LoginContext)
  const setLoading = React.useContext(DispatchLoadingContext)
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: '/api/admin/users', method: 'get' })
      .then(response => {
        setLoading(false)
        setUsers(response.data.users)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  const handleLockChange = (user: UserT) => {
  }

  const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children)

  return (
    <Row className="m-3">
      <Table borderless hover responsive striped>
        <caption>Users</caption>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Locked</th>
            <th>Lock/Unlock</th>
          </tr>
        </thead>
        <tbody>
          { users.length == 0
            ? <tr><td colSpan={5}>No users found</td></tr>
            : users.map((user: UserT) => (
              <tr key={user.id} style={{ verticalAlign: 'middle' }}>
                <td>{user.last_name}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td className="text-capitalize">{user.admin.toString()}</td>
                <td className="text-capitalize">{user.locked.toString()}</td>
                <td>
                  <ConditionalWrapper condition={user.id === admin.id} wrapper={children => (
                    <OverlayTrigger placement="right" overlay={<Tooltip id={`user-${user.id}`}>Can't disable the active user.</Tooltip>}>
                      {children}
                    </OverlayTrigger>
                  )}>
                    <div>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleLockChange(user)} disabled={user.id === admin.id}>
                        { user.locked
                          ? <LockFill />
                          : <UnlockFill />
                        }
                      </Button>
                    </div>
                  </ConditionalWrapper>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Row>
  )
}

export default AdminUsers
