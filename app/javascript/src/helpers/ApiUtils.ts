const checkStatus = (response) => {
  if (response.ok) { return response }

  const error = new Error(response.statusText)
  error["response"] = response
  throw error
}

export default {
  checkStatus,
}
