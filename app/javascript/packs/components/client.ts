import * as Cookie from 'js-cookie'
import axios from 'axios'

type RequestT = {
  data?: any,
  headers?: any,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  params?: any,
  path: string,
}

const request = (props: RequestT) => {
  const token = Cookie.get('jwt')

  const {
    data = {},
    headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'},
    method,
    params = {},
    path,
  } = props

  if (method === 'get') {
    params.token = token
  } else {
    data.token = token
  }

  return axios({
    data,
    headers,
    method,
    params,
    url: path,
  })
}

export default { request }
