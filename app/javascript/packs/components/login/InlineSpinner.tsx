import * as React from 'react'
import classnames from 'classnames'

type PropsT = {
  style?: any
}

const InlineSpinner: React.FC<PropsT> = (props: PropsT) => {
  const {
    style = {}
  } = props

  style.marginLeft = style.marginLeft || '1em'
  style.marginRight = style.marginRight || '1em'
  style.verticalAlign = style.verticalAlign || 'middle'

  return (
    <div className={classnames('spinner-border', 'text-info')} style={style}>
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default InlineSpinner
