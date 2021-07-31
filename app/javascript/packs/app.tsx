import * as React from "react" // we need this to make JSX compile
import * as ReactDOM from "react-dom"
import * as Router from "react-router-dom"
import { Provider, connect } from "react-redux"

import { store } from "../src/config/stores"

import {
  Navbar,
  Nav,
} from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.css"
import "./app.css"

import Admin from "./components/Admin"
import FlashMessages from "../src/alerts/FlashMessages"
import Sheet from "./components/Sheet"
import Sheets from "./components/Sheets"
import LoadingModal from "./components/LoadingModal"
import { LoadingProvider } from "./components/LoadingProvider"

//import DeviseConfirmationsNew from "../src/devise/confirmations/DeviseConfirmationsNew"
//import DeviseConfirmationsShow from "../src/devise/confirmations/DeviseConfirmationsShow"
//import DevisePasswordsNew from "../src/devise/passwords/DevisePasswordsNew"
//import DevisePasswordsEdit from "../src/devise/passwords/DevisePasswordsEdit"
//import DeviseRegistrationsNew from "../src/devise/registrations/DeviseRegistrationsNew"
import DeviseSessionsNew from "../src/devise/sessions/DeviseSessionsNew"
//import DeviseUnlocksNew from "../src/devise/unlocks/DeviseUnlocksNew"
//import DeviseUnlocksShow from "../src/devise/unlocks/DeviseUnlocksShow"
import sessionActions from "../src/devise/sessions/actions"

type AppPropsT = {
  dispatch: any,
  user: any,
}

export const App: React.FC<AppPropsT> = (props: AppPropsT) => {
  const { user } = props
  const [validUser, setValidUser] = React.useState(user.valid)

  React.useEffect(() => {
    setValidUser(user.valid)
  }, [user])

  function onLogout() {
    props.dispatch(sessionActions.logout())
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
          <Router.Switch>
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
          </Router.Switch>
        </div>
      </Router.BrowserRouter>
    </LoadingProvider>
  )
}

function mapStateToProps(state) {
  const { user } = state.authentication
  return { user }
}

const ConnectedApp = connect(mapStateToProps)(App)

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp/>
    </Provider>,
    document.body.appendChild(document.createElement("div")),
  )
})
