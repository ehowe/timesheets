import * as React from "react" // we need this to make JSX compile
import * as ReactDOM from "react-dom"
import * as Router from "react-router-dom"

import { UserContext, UserProvider } from "./components/UserContext"
import { Login } from "./components/Login"

type AppPropsT = Record<string, never>
export const App: React.FC<AppPropsT> = () => {
  const [user, setUser] = React.useState({ email: null, first_name: null, last_name: null })
  const localUser = React.useContext(UserContext)

  React.useEffect(() => {
    setUser(localUser)
  }, [localUser])

  console.log(user)

  return (
    <UserProvider>
      <Router.BrowserRouter>
        <div>
          <ul>
            { !user.email && (
              <Router.Link to="/login">Login</Router.Link>
            ) }
          </ul>

          <Router.Switch>
            <Router.Route path="/login">
              <Login />
            </Router.Route>
          </Router.Switch>
        </div>
      </Router.BrowserRouter>
    </UserProvider>
  )
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.createElement("div")),
  )
})
