export type MessageT = {
  type: string,
  text: any,
  id: any,
}

export type FormUserT = {
  email?: string,
  password?: string,
  password_confirmation?: string,
  reset_password_token?: string,
  token?: string,
}

export type FormActionT = {
  user?: FormUserT,
  dispatch: (args: any) => void,
}
