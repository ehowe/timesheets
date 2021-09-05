import * as React from 'react'
import { sortBy } from 'lodash'

import {
  Button,
  Form,
  Row,
  Table,
} from 'react-bootstrap'

import client from './client'
import { DispatchLoadingContext } from './LoadingProvider'
import { SetExpiredLoginContext } from './ExpiredLoginProvider'
import Modal from './Modal'

type StateT = {
  name?: string,
}

const AdminPayrollCategories: React.FC = () => {
  const handleErrorResponse = React.useContext<any>(SetExpiredLoginContext).handleErrorResponse

  const setLoading = React.useContext(DispatchLoadingContext)
  const [open, setOpen] = React.useState(false)
  const [categories, setCategories] = React.useState([])
  const [formError, setFormError] = React.useState('')

  const INIT_STATE: StateT = {
    name: '',
  }

  const reducer = (state: StateT, update: StateT) => ({...state, ...update})
  const [categoryState, dispatch] = React.useReducer(reducer, INIT_STATE)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ [e.target.name]: e.target.value })
  }

  const submit = () => {
    setLoading(true)

    client.request({ path: '/api/admin/payroll_categories', method: 'post', data: { payroll_category: categoryState } })
      .then(response => {
        const newCategories = sortBy([...categories, response.data.payroll_category], (c: { name: string }) => c.name)

        setCategories(newCategories)
        setOpen(false)
      })
      .catch(error => {
        handleErrorResponse(error)
        setFormError(error.response.data)
      })
      .finally(() => setLoading(false))
  }

  React.useEffect(() => {
    client.request({ path: '/api/admin/payroll_categories', method: 'get' })
      .then(response => {
        setCategories(response.data.payroll_categories)
      })
      .catch(error => handleErrorResponse(error))
  }, [])

  return (
    <Row className="m-3">
      <h3>Payroll Categories</h3>
      <Table borderless hover responsive striped>
        <caption>Payroll categories</caption>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          { categories.length == 0
            ? <tr><td>No categories found</td></tr>
            : categories.map((category, i) => <tr key={i}><td key={category.name}>{category.name}</td></tr>)
          }
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setOpen(true)}>Create new payroll category</Button>
      <Modal title="Create Payroll Category" handleClose={() => setOpen(false)} show={open}>
        <Form>
          { formError.length > 0 && <p className="text-danger">There was an error completing this request: {formError}</p>}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleNameChange} value={categoryState.name} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button onClick={submit}>Submit</Button>
          </Form.Group>
        </Form>
      </Modal>
    </Row>
  )
}

export default AdminPayrollCategories
