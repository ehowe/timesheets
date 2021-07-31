/*
** Form CSRF
*
*  Fetches the CSRF token, generated by Rails, from the page head meta field.
*/

const csrfToken = () => (
  document.querySelector("meta[name=\"csrf-token\"]").getAttribute("content")
)

export default {
  csrfToken,
}
