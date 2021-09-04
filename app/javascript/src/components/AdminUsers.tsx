import * as React from 'react'
import { LockFill, UnlockFill } from 'react-bootstrap-icons'
import { chunk, remove } from 'lodash'

import { UserT } from '../model.types'

import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap'

import Select from 'react-select'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { LoginContext } from './login/LoginProvider'
import Modal from './Modal'

const AdminUsers: React.FC = () => {
  const { user: admin } = React.useContext(LoginContext)
  const setLoading = React.useContext(DispatchLoadingContext)
  const [users, setUsers] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [formError, setFormError] = React.useState(false)
  const [editCategoriesOpen, setEditCategoriesOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [allPayrollCategories, setAllPayrollCategories] = React.useState([])
  const [userPayrollCategories, setUserPayrollCategories] = React.useState([])

  const INIT_STATE = {
    email: '',
    first_name: '',
    last_name: '',
    admin: false,
  }

  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE)

  React.useEffect(() => {

  }, [allPayrollCategories, userPayrollCategories])

  React.useEffect(() => {
    setLoading(true)

    client.request({ path: '/api/admin/users', method: 'get' })
      .then(response => {
        setUsers(response.data.users)

        return client.request({ path: '/api/admin/payroll_categories', method: 'get' })
      })
      .then(response => setAllPayrollCategories(response.data.payroll_categories))
      .catch(error => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    if (selectedUser) {
      client.request({ path: `/api/admin/payroll_categories`, method: 'get', params: { user_id: selectedUser.id } })
        .then(response => setUserPayrollCategories(response.data.payroll_categories))
    }
  }, [selectedUser])

  const handleLockChange = (user: UserT) => {
    setLoading(true)
    const action = user.locked ? 'unlock' : 'lock'
    client.request({ path: `/api/admin/users/${user.id}/lock`, method: 'put', data: { user: { action } } })
      .then(response => {
        const { user } = response.data
        const userIndex = users.findIndex(u => u.id === user.id)
        const updatedUsers = [...users]
        updatedUsers[userIndex] = user
        setUsers(updatedUsers)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ [e.target.name]: e.target.value })
  }

  const handleUserSubmit = () => {
    setLoading(true)

    client.request({ path: '/api/admin/users', method: 'post', data: { user: state } })
      .then(response => {
        setUsers([ ...users, response.data.user ])
        setOpen(false)
      })
      .catch(error => {
        console.log(error)
        setFormError(true)
      })
      .finally(() => setLoading(false))
  }

  const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children)

  const handleMoreOptionsSelect = (user: any, e: any) => {
    setSelectedUser(user)

    if (e.value === 'modify_payroll_categories') {
      setEditCategoriesOpen(true)
    }
  }

  const moreOptionsOptions = [
    { label: 'Select an action', value: '' },
    { label: 'Modify Payroll Categories', value: 'modify_payroll_categories' },
  ]

  const handleCategoryCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const catExists = userPayrollCategories.map(cat => cat.id).includes(parseInt(e.target.value))

    const newCategories = [...userPayrollCategories]

    if (catExists) {
      remove(newCategories, (cat) => cat.id === parseInt(e.target.value))
    } else {
      const category = allPayrollCategories.find(category => category.id === parseInt(e.target.value))
      newCategories.push(category)
    }

    setUserPayrollCategories(newCategories)
  }

  const saveUserCategories = () => {
    client.request({ path: `/api/admin/users/${selectedUser.id}/payroll_categories`, method: 'put', data: { categories: userPayrollCategories } })
      .then(response => {
        setUserPayrollCategories(response.data.payroll_categories)
      })
      .finally(() => {
        setEditCategoriesOpen(false)
        setSelectedUser(null)
      })
  }

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
            <th style={{ textAlign: 'center' }}>Lock/Unlock</th>
            <th>More Options</th>
          </tr>
        </thead>
        <tbody>
          { users.length == 0
            ? <tr><td colSpan={6}>No users found</td></tr>
            : users.map((user: UserT) => (
              <tr key={user.id} style={{ verticalAlign: 'middle' }}>
                <td>{user.last_name}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td className="text-capitalize">{user.admin.toString()}</td>
                <td className="text-capitalize">{user.locked.toString()}</td>
                <td style={{ textAlign: 'center' }}>
                  <ConditionalWrapper condition={user.id === admin.id} wrapper={children => (
                    <OverlayTrigger placement="right" overlay={<Tooltip id={`user-${user.id}`}>Can't disable the active user.</Tooltip>}>
                      {children}
                    </OverlayTrigger>
                  )}>
                    <div style={{ display: 'inline-block' }}>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleLockChange(user)} disabled={user.id === admin.id}>
                        { user.locked
                          ? <UnlockFill />
                          : <LockFill />
                        }
                      </Button>
                    </div>
                  </ConditionalWrapper>
                </td>
                <td>
                  <Select
                    onChange={(e: any) => handleMoreOptionsSelect(user, e)}
                    options={moreOptionsOptions}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setOpen(true)}>Add user</Button>
      <Modal title="Add User" handleClose={() => setOpen(false)} show={open}>
        <Form>
          { formError && <p className="text-danger">There was an error completing this request. Please try again</p> }
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" onChange={handleUserChange} value={state.email}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first_name" onChange={handleUserChange} value={state.first_name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="last_name" onChange={handleUserChange} value={state.last_name} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Check type="checkbox" label="Admin" name="admin" onChange={handleUserChange} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={handleUserSubmit}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
      <Modal title="Edit Payroll Categories" handleClose={() => setEditCategoriesOpen(false)} show={editCategoriesOpen}>
        <Container className="p-0">
          { chunk(allPayrollCategories, 2).map((categories, i) => (
            <Row key={i}>
              { categories.map(category => (
                <Col key={category.id}>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox
                      aria-label={category.name}
                      checked={userPayrollCategories.map(({ id }: { id: number }) => id).includes(category.id)}
                      onChange={handleCategoryCheck}
                      value={category.id}
                    />
                    <InputGroup.Text className="w-75">{category.name}</InputGroup.Text>
                  </InputGroup>
                </Col>
              ))}
            </Row>
          ))}
          <Form.Group className="mt-3">
            <Button onClick={saveUserCategories} className="w-100">Submit</Button>
          </Form.Group>
        </Container>
      </Modal>
    </Row>
  )
}

export default AdminUsers
