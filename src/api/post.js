import Axios from "axios"

const token = window.localStorage.getItem("token")

export const saveContact = (data) => {
  return Axios.post(`${process.env.REACT_APP_BACKEND}/api/contacts/save`, {
    ...data
  }, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const getContacts = () => {
  return Axios.get(`${process.env.REACT_APP_BACKEND}/api/contacts/all`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}