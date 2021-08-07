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

type HideT = 'confirmations_new' |
  'password_reset' |
  'login' |
  'register' |
  'unlocks_new' |
  'confirmations_show' |
  'change_password' |
  'unlocks_show'

type PropsT = {
  hide?: Array<HideT>,
  children: Array<JSX.Element>,
}

const LoginRouter: React.FC<PropsT> = (props: PropsT) => {
  const { hide = [] } = props

  const hideConfirmationsNew = hide.includes('confirmations_new')
  const hidePasswordsNew = hide.includes('password_reset')
  const hideSessionsNew = hide.includes('login')
  const hideRegistrationsNew = hide.includes('register')
  const hideUnlocksNew = hide.includes('unlocks_new')
  const hideConfirmationsShow = hide.includes('confirmations_show')
  const hidePasswordsEdit = hide.includes('change_password')
  const hideUnlocksShow = hide.includes('unlocks_show')

  return (
    <Router history={history}>
      <Switch>
        { !hideConfirmationsNew && <Route path="/users/confirmation/new" component={DeviseConfirmationsNew} /> }
        { !hidePasswordsNew && <Route path="/users/password/new" component={DevisePasswordsNew} /> }
        { !hideSessionsNew && <Route path="/users/sign_in" component={DeviseSessionsNew} /> }
        { !hideRegistrationsNew && <Route path="/users/sign_up" component={DeviseRegistrationsNew} /> }
        { !hideUnlocksNew && <Route path="/users/unlocks/new" component={DeviseUnlocksNew} /> }
        { !hideConfirmationsShow && <Route path="/users/:userId/confirmation" component={DeviseConfirmationsShow} /> }
        { !hidePasswordsEdit && <Route path="/users/:userId/password/edit" component={DevisePasswordsEdit} /> }
        { !hideUnlocksShow && <Route path="/users/:userId/unlock" component={DeviseUnlocksShow} /> }
        { [...props.children] }
      </Switch>
    </Router>
  )
}

export default LoginRouter
