import Axios from "axios"
import { toast } from "react-toastify";
const token = window.localStorage.getItem("token")
const visitorToken = window.localStorage.getItem("visitorToken")
const BACKEND = process.env.REACT_APP_BACKEND;

export const getAxios = async ({
  method = 'get',
  data = {},
  params = {},
  options = {
    withToken: true,
    withVisitorToken: false
  },
  url = ""
} = {}) => {
  if (options.withToken && !token) {
    return;
  }
  return await Axios({
    method,
    url: `${BACKEND}/api${url}`,
    data,
    headers: {
      ...options.withToken && {token},
      ...options.withVisitorToken && {visitorToken}

    },
    params: {
      ...params
    }
  })
  .then(res => res.data)
  .catch(err => {
    if (err.response) {
      toast.error(err.response.data)
      if(err.response.data.err === "Auth token is old. Please sign in again.") {
        window.localStorage.clear();
        window.location.pathname = "/login" 
      }
    }
    return false;
  })
  
}