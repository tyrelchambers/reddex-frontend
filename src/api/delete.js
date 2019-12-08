import Axios from "axios"

const token = window.localStorage.getItem('token');

export const deleteContact = (id) => {
  return Axios.delete(`${process.env.REACT_APP_BACKEND}/api/contacts/delete`, {
    params: {
      id
    },
    headers: {
      token
    }
  })
  .then(res => res.data)
}