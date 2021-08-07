import * as React from 'react'

import { DispatchLoginContext } from '../../LoginProvider'

import unlockActions from './actions'

type PropsT = {
  location: { search: any },
}

const DeviseUnlocksShow: React.FC<PropsT> = (props: PropsT) => {
  const dispatch = React.useContext(DispatchLoginContext)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)
    const token = urlParams.get('unlock_token')

    unlockActions.unlock({ dispatch, user: { token } })
  }, [])

  return (
    <div>
      <h2>Unlocking your account...</h2>
    </div>
  )
}

export default DeviseUnlocksShow
