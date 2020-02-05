import Axios from "axios"

const token = window.localStorage.getItem('token');
const BACKEND = process.env.REACT_APP_BACKEND;


export const deleteAccount = (uuid) => {
  return Axios.delete(`${BACKEND}/api/profile/delete`, {
    params: {
      uuid
    },
    headers: {
      token
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}