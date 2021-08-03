import * as React from 'react'
import { Button } from 'react-bootstrap'
import history from '../helpers/History'

type PropsT = {
  location: { pathname: string },
}

const FourOFour:React.FC<PropsT> = ({ location }: PropsT) => (
  <div>
    <h3>404 - No match for <code>{location.pathname}</code></h3>
    <Button color="primary" onClick={() => history.push('/')}>Back to the homepage</Button>
  </div>
)

export default FourOFour
