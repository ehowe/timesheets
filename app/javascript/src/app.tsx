import * as React from 'react' // we need this to make JSX compile
import * as Router from 'react-router-dom'
import styled from 'styled-components'

import {
  Container as BootstrapContainer,
  Col,
  Navbar as BootstrapNavbar,
  Nav,
  Row,
} from 'react-bootstrap'

import Admin from './components/Admin'
import AdminTimesheet from './components/AdminTimesheet'
import Sheet from './components/Sheet'
import Sheets from './components/Sheets'
import LoadingModal from './components/LoadingModal'
import LoginRouter from './components/login/Router'
import { ExpiredLoginProvider } from './components/ExpiredLoginProvider'
import { LoadingProvider } from './components/LoadingProvider'
import { LoginContext, DispatchLoginContext } from './components/login/LoginProvider'
import { WebsocketsProvider } from './components/WebsocketsProvider'

import FlashMessages from './components/login/alerts/FlashMessages'
import sessionActions from './components/login/login/sessions/actions'
import DeviseRegistrationsNew from './components/login/login/registrations/DeviseRegistrationsNew'

const App: React.FC = () => {
  const { loggedIn, user } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)

  function onLogout() {
    sessionActions.logout({ dispatch: dispatchLogin })
  }

  const NewUser: React.FC = () => {
    const fields = [
      {
        id: "first_name",
        name: 'first_name',
        label: 'First Name',
        type: 'text'
      },
      {
        id: "last_name",
        name: 'last_name',
        label: 'Last Name',
        type: 'text',
      },
    ]

    return (
      <DeviseRegistrationsNew additionalRequiredFields={fields} />
    )
  }

  return (
    <LoadingProvider>
      <WebsocketsProvider>
        <LoadingModal />
        <Router.BrowserRouter>
          <ExpiredLoginProvider>
            <Navbar variant="light" expand="md">
              <Navbar.Brand href="/">Timesheets</Navbar.Brand>
              { loggedIn && (
                <Navbar.Text>{user.full_name}</Navbar.Text>
              )}
              <Nav className="ms-auto" navbar>
                { loggedIn && (
                  <React.Fragment>
                    { user.admin && (
                      <Nav.Item>
                        <Nav.Link href="/admin">Admin</Nav.Link>
                      </Nav.Item>
                    )}
                    <Nav.Item>
                      <Nav.Link href="/">Sheets</Nav.Link>
                    </Nav.Item>
                  </React.Fragment>
                )}
                <Nav.Item>
                  { loggedIn
                    ? (
                      <Nav.Link href="#" onClick={onLogout}>Logout</Nav.Link>
                    ) : (
                      <Nav.Link href="/users/sign_in">Login</Nav.Link>
                    )
                  }
                </Nav.Item>
              </Nav>
            </Navbar>
            <Container fluid>
              <Row>
                <Col md={{ span: 2 }}>
                  <FlashMessages />
                </Col>
                <Col md={{ span: 8 }}>
                  <LoginRouter hide={['register']}>
                    { loggedIn && (
                      <React.Fragment>
                        <Router.Route exact path="/timesheets" component={Sheets} />
                        <Router.Route path="/timesheets/:id" component={Sheet} />
                        <Router.Route exact path="/">
                          <Router.Redirect to="/timesheets" />
                        </Router.Route>
                        { user.admin && (
                          <React.Fragment>
                            <Router.Route exact path="/admin/timesheets" component={Admin} />
                            <Router.Route exact path="/admin/timesheets/:id" component={AdminTimesheet} />
                            <Router.Route exact path="/admin/payroll_schedules" component={Admin} />
                            <Router.Route exact path="/admin/payroll_categories" component={Admin} />
                            <Router.Route exact path="/admin/users" component={Admin} />
                            <Router.Route exact path="/admin">
                              <Router.Redirect to="/admin/timesheets" />
                            </Router.Route>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                    { !loggedIn && (
                      <React.Fragment>
                        <Router.Route path="/users/sign_up" component={NewUser} />
                        <Router.Redirect from="*" to="/users/sign_in" />
                      </React.Fragment>
                    )}
                  </LoginRouter>
                </Col>
              </Row>
            </Container>
          </ExpiredLoginProvider>
        </Router.BrowserRouter>
      </WebsocketsProvider>
    </LoadingProvider>
  )
}

const Navbar = styled(BootstrapNavbar)`
  padding-left: 1em;
  padding-right: 1em;
`

const Container = styled(BootstrapContainer)`
  padding-top: 3em;
`

export default App
