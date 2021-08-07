export type MessageT = {
  type: string,
  text: any,
  id: any,
}

export type FormUserT = {
  email?: string,
  password?: string,
  password_confirmation?: string,
  token?: string,
}

export type FormActionT = {
  user?: FormUserT,
  dispatch: (args: any) => void,
}
