import alertConstants from './constants'

const success = message => ({ message, type: alertConstants.SUCCESS })

const error = message => ({ message, type: alertConstants.ERROR })

const clear = () => ({ type: alertConstants.CLEAR })

export default {
  success,
  error,
  clear,
}
