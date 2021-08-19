/*
** Form CSRF Input
*
*  Build an input HTML element with the Rails form CSRF token
*/
import * as React from 'react'

import FormCsrf from './FormCsrf'

const FormCsrfInput: React.FC = () => (
  <input
    type="hidden"
    name="authenticity_token"
    value={FormCsrf.csrfToken()}
    readOnly
  />
)

export default FormCsrfInput
