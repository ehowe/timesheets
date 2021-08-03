import { combineReducers } from 'redux'

import alert from '../../alerts/reducer'
import authentication from '../../devise/sessions/reducers'
import {
  confirmation,
  resendConfirmation,
} from '../../devise/confirmations/reducers'
import password from '../../devise/passwords/reducers'
import registration from '../../devise/registrations/reducers'
import users from '../../home/reducers'
import unlock from '../../devise/unlocks/reducers'

const rootReducer = combineReducers({
  alert,
  authentication,
  confirmation,
  password,
  registration,
  resendConfirmation,
  unlock,
  users,
})

export default rootReducer
