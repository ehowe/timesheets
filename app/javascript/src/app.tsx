import * as React from 'react' // we need this to make JSX compile
import * as Router from 'react-router-dom'

import {
  Container,
  Col,
  Navbar,
  Nav,
  Row,
} from 'react-bootstrap'

import Admin from './components/Admin'
import Sheet from './components/Sheet'
import Sheets from './components/Sheets'
import LoadingModal from './components/LoadingModal'
import LoginRouter from './components/login/Router'
import { LoadingProvider } from './components/LoadingProvider'
import { LoginContext, DispatchLoginContext } from './components/login/LoginProvider'

import FlashMessages from './components/login/alerts/FlashMessages'
import DeviseSessionsNew from './components/login/login/sessions/DeviseSessionsNew'
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
        type: 'text',
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
      <LoadingModal />
      <Router.BrowserRouter>
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
                    <Router.Route exact path="/" component={Sheets} />
                    <Router.Route path="/timesheets/:id" component={Sheet} />
                    { user.admin && (
                      <Router.Route path="/admin" component={Admin} />
                    )}
                  </React.Fragment>
                )}
                { !loggedIn && (
                  <React.Fragment>
                    <Router.Route exact path="/" component={DeviseSessionsNew} />
                    <Router.Route path="/users/sign_up" component={NewUser} />
                  </React.Fragment>
                )}
              </LoginRouter>
            </Col>
          </Row>
        </Container>
      </Router.BrowserRouter>
    </LoadingProvider>
  )
}

export default App
