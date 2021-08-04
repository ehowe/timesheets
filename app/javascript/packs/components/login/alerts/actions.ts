import loginConstants from '../constants'

const success = ({ message, dispatch }: { message: string, dispatch: (any) => void }): void => {
  dispatch({ type: loginConstants.ALERT, use: loginConstants.ALERT_SUCCESS, payload: message })
}

const error = ({ message, dispatch }: { message: string, dispatch: (any) => void }): void => {
  dispatch({ type: loginConstants.ALERT, use: loginConstants.ALERT_ERROR, payload: message })
}

const clear = ({ dispatch }: { dispatch: (any) => void }): void => {
  dispatch({ type: loginConstants.ALERT, use: loginConstants.ALERT_CLEAR })
}

export default {
  success,
  error,
  clear,
}
