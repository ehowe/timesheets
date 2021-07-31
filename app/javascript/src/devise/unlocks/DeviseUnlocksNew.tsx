import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  Col,
  Row,
} from "react-bootstrap"

import unlockActions from "./actions"

type PropsT = {
  dispatch: any,
  errors: any,
  unlocking: any,
}

const DeviseUnlocksNew: React.FC<PropsT> = (props: PropsT) => {
  const { unlocking, errors } = props

  const initState = {
    user: {
      email: "",
    },
    submitted: false,
  }

  const reducer = (state, update) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, initState)

  function handleChange(event) {
    const { name, value } = event.target
    const { user } = state
    dispatch({
      user: {
        ...user,
        [name]: value,
      },
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    dispatch({ submitted: true })
    const { user } = state
    if (user.email) {
      props.dispatch(unlockActions.resendUnlock(user))
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Resend unlock instructions</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className={"form-group" + (state.submitted && (!state.user.email || (errors && errors.email)) ? " has-error" : "")}>
            <label htmlFor="user_email">Email</label>
            <input type="email" className="form-control" name="email" id="user_email" value={state.user.email} onChange={handleChange} />
            {state.submitted && !state.user.email &&
              <div className="help-block">Email is required</div>
            }
            {state.submitted && errors && errors.email &&
              <div className="help-block">{errors.email}</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Resend unlock instructions</button>
            {unlocking &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/users/sign_up" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  const { unlocking, errors } = state.unlock
  return {
    unlocking,
    errors,
  }
}

export default connect(mapStateToProps)(DeviseUnlocksNew)
