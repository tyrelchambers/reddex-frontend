import Axios from "axios"

const token = window.localStorage.getItem("token")

export const getContact = (name) => {
  return Axios.get(`${process.env.REACT_APP_BACKEND}/api/contacts/name`, {
    params: {
      name
    },
    headers: {
      token
    }
  })
  .then(res => res.data)
}