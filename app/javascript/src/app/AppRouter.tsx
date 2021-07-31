/*
** Application Router
*
*  You can read more about React router here:
*  https://reacttraining.com/react-router/web/guides/philosophy
*/
import * as React from "react"
import { connect } from "react-redux"
import {
  Router,
  Route,
  Switch,
} from "react-router-dom"

// App
import history from "../helpers/History"
import FourOFour from "./FourOFour"

// Devise
import DeviseConfirmationsNew from "../devise/confirmations/DeviseConfirmationsNew"
import DeviseConfirmationsShow from "../devise/confirmations/DeviseConfirmationsShow"
import DevisePasswordsEdit from "../devise/passwords/DevisePasswordsEdit"
import DevisePasswordsNew  from "../devise/passwords/DevisePasswordsNew"
import DeviseRegistrationsNew from "../devise/registrations/DeviseRegistrationsNew"
import DeviseSessionsNew from "../devise/sessions/DeviseSessionsNew"
import DeviseUnlocksNew from "../devise/unlocks/DeviseUnlocksNew"
import DeviseUnlocksShow from "../devise/unlocks/DeviseUnlocksShow"

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
      </Switch>
    </Router>
  )
}

export default connect()(AppRouter)
