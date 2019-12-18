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

export const getImportedStory = (url) => {
  return Axios.get(url).then(res => res.data[0].data.children[0].data)
}