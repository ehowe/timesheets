import * as React from 'react'
import classnames from 'classnames'

type PropsT = {
  label: string,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  showValid: boolean,
  type?: string,
  value: string,
}

const FormInput: React.FC<PropsT> = (props: PropsT) => {
  const {
    label,
    name,
    onChange,
    showValid,
    value,
  } = props

  const isValid = value.length > 0

  let { type: inputType } = props

  inputType = inputType || name

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange} type={inputType} id={name} name={name} className={classnames('form-control', { 'is-valid': showValid && isValid, 'is-invalid': showValid && !isValid })} aria-label={label}/>
      <div style={{ height: '1em' }} className="mb-1">
        <div className="help-block h-100 text-muted">{ showValid && `${label} is required` }</div>
      </div>
    </div>
  )
}

export default FormInput
