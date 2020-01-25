import Axios from "axios"

const token = window.localStorage.getItem('token');
const BACKEND = process.env.REACT_APP_BACKEND;

export const deleteContact = (id) => {
  return Axios.delete(`${BACKEND}/api/contacts/delete`, {
    params: {
      id
    },
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const deleteImageFromStorage = (url) => {
  return Axios.delete(`${BACKEND}/api/upload/revert`, {
    params: {
      url
    },
    headers: {
      token
    }
  })
  .then(res => res.data)
}


export const deleteSite = (siteId) => {
  return Axios.delete(`${BACKEND}/api/site/delete`, {
    params: {
      siteId
    }, 
    headers: {
      token
    }
  })
  .then(res => res.data)
}

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