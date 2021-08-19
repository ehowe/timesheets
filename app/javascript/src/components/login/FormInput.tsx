import * as React from 'react'
import classnames from 'classnames'

type PropsT = {
  CustomErrors?: any,
  isValid?: () => boolean,
  label: string,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  showValid: boolean,
  type?: string,
  value: string,
}

const FormInput: React.FC<PropsT> = (props: PropsT) => {
  const {
    CustomErrors,
    isValid = () => value.length > 0,
    label,
    name,
    onChange,
    showValid,
    value,
  } = props

  let { type: inputType } = props

  inputType = inputType || name

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange} type={inputType} id={name} name={name} className={classnames('form-control', { 'is-valid': showValid && isValid(), 'is-invalid': showValid && !isValid() })} aria-label={label}/>
      <div style={{ height: '1em' }} className="mb-1">
        { showValid && !isValid() && (
          <React.Fragment>
            { CustomErrors
              ? CustomErrors()
              : <div className="help-block h-100 text-muted">{`${label} is required`}</div>}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default FormInput
