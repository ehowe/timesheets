/*
** Application Router
*
*  You can read more about React router here:
*  https://reacttraining.com/react-router/web/guides/philosophy
*/
import * as React from 'react'
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom'

// App
import history from './helpers/History'

// Devise
import DeviseConfirmationsNew from './login/confirmations/DeviseConfirmationsNew'
import DeviseConfirmationsShow from './login/confirmations/DeviseConfirmationsShow'
import DevisePasswordsEdit from './passwords/DevisePasswordsEdit'
import DevisePasswordsNew  from './passwords/DevisePasswordsNew'
import DeviseRegistrationsNew from './login/registrations/DeviseRegistrationsNew'
import DeviseSessionsNew from './login/sessions/DeviseSessionsNew'
import DeviseUnlocksNew from './login/unlocks/DeviseUnlocksNew'
import DeviseUnlocksShow from './login/unlocks/DeviseUnlocksShow'

const LoginRouter: React.FC = ({ children }: { children: Array<JSX.Element> }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/users/confirmation/new" component={DeviseConfirmationsNew} />
        <Route path="/users/password/new" component={DevisePasswordsNew} />
        <Route path="/users/sign_in" component={DeviseSessionsNew} />
        <Route path="/users/sign_up" component={DeviseRegistrationsNew} />
        <Route path="/users/unlocks/new" component={DeviseUnlocksNew} />
        <Route path="/users/:userId/confirmation" component={DeviseConfirmationsShow} />
        <Route path="/users/:userId/password/edit" component={DevisePasswordsEdit} />
        <Route path="/users/:userId/unlock" component={DeviseUnlocksShow} />
        { [...children] }
      </Switch>
    </Router>
  )
}

export default LoginRouter
