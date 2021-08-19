import axios from 'axios'
import * as Cookies from 'js-cookie'
import ApiUtils from './helpers/ApiUtils'

type RequestT = {
  data?: any,
  headers?: any,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  params?: any,
  path: string,
}

const request = (props: RequestT) => {
  const {
    data,
    headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': Cookies.get('csrf_token') },
    method,
    params = {},
    path,
  } = props

  return axios({
    data,
    headers,
    method,
    params,
    url: path,
  }).then(ApiUtils.checkStatus).then(response => response.data)
}

export default { request }
