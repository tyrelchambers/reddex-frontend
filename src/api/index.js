import Axios from "axios"
const token = window.localStorage.getItem("token")
const BACKEND = process.env.REACT_APP_BACKEND;
export const getAxios = ({
  method = 'get',
  data = {},
  params = {},
  options = {
    withToken: true
  },
  url = ""
} = {}) => {

  return Axios({
    method,
    url: `${BACKEND}/api${url}`,
    data,
    headers: {
      ...options.withToken && {token}
    },
    params: {
      ...params
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
  
}