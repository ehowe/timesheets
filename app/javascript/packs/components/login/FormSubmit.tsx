import * as React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import InlineSpinner from './InlineSpinner'

type LinkT = {
  to: string,
  text: string,
}

type PropsT = {
  disabled: () => boolean,
  links?: Array<LinkT>,
  onSubmit: () => void,
  showSpinner: boolean,
  text: string,
}

const FormSubmit: React.FC<PropsT> = (props: PropsT) => {
  const {
    disabled,
    links = [],
    onSubmit,
    showSpinner,
    text,
  } = props

  return (
    <div className="mt-1">
      <button type="button" className={classnames('btn', 'btn-primary', { disabled: disabled() })} onClick={onSubmit}>{text}</button>
      { showSpinner && <InlineSpinner /> }
      { links.map((link: LinkT) => (
        <Link key={link.to} to={link.to} className="btn btn-link">{link.text}</Link>
      )) }
    </div>
  )
}

export default FormSubmit
