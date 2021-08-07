import * as React from 'react'

import confirmationActions from './actions'

import { DispatchLoginContext } from '../../LoginProvider'

type PropsT = {
  location: { search: any },
}

const DeviseConfirmationsShow: React.FC<PropsT> = (props: PropsT) => {
  const dispatch = React.useContext(DispatchLoginContext)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)
    const token = urlParams.get('confirmation_token')

    confirmationActions.confirm({ user: { token }, dispatch })
  }, [])

  return (
    <div>
      <h2>Confirming your account ...</h2>
    </div>
  )
}

export default DeviseConfirmationsShow
