import * as React from 'react' // we need this to make JSX compile
import * as ReactDOM from 'react-dom'
import * as Router from 'react-router-dom'

import {
  Navbar,
  Nav,
} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import './app.css'

import Admin from './components/Admin'
import Sheet from './components/Sheet'
import Sheets from './components/Sheets'
import LoadingModal from './components/LoadingModal'
import LoginRouter from './components/login/Router'
import { LoadingProvider } from './components/LoadingProvider'
import { LoginProvider, LoginContext, DispatchLoginContext } from './components/login/LoginProvider'

import FlashMessages from './components/login/alerts/FlashMessages'
import DeviseSessionsNew from './components/login/login/sessions/DeviseSessionsNew'
import sessionActions from './components/login/login/sessions/actions'

export const App: React.FC = () => {
  const { user } = React.useContext(LoginContext)
  const dispatchLogin = React.useContext(DispatchLoginContext)
  const [validUser, setValidUser] = React.useState(user.valid)

  React.useEffect(() => {
    setValidUser(user.valid)
  }, [user])

  function onLogout() {
    sessionActions.logout({ dispatch: dispatchLogin })
  }

  return (
    <LoadingProvider>
      <LoadingModal />
      <Router.BrowserRouter>
        <div>
          <Navbar variant="light" expand="md">
            <Navbar.Brand href="/">Timesheets</Navbar.Brand>
            { validUser && (
              <Navbar.Text>{user.full_name}</Navbar.Text>
            )}
            <Nav className="ms-auto" navbar>
              { validUser && (
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
                { validUser
                  ? (
                    <Nav.Link href="#" onClick={onLogout}>Logout</Nav.Link>
                  ) : (
                    <Nav.Link href="/login">Login</Nav.Link>
                  )
                }
              </Nav.Item>
            </Nav>
          </Navbar>
          <FlashMessages />
          <LoginRouter>
            { validUser && (
              <React.Fragment>
                <Router.Route exact path="/" component={Sheets} />
                <Router.Route path="/timesheets/:id" component={Sheet} />
                { user.admin && (
                  <Router.Route path="/admin" component={Admin} />
                )}
              </React.Fragment>
            )}
            { !validUser && (
              <Router.Route path="/" component={DeviseSessionsNew} />
            )}
          </LoginRouter>
        </div>
      </Router.BrowserRouter>
    </LoadingProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <LoginProvider>
      <App/>
    </LoginProvider>,
    document.body.appendChild(document.createElement('div')),
  )
})
