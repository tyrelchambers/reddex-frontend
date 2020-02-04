import Axios from "axios"
import React from 'react';

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
    }
  })
  .then(res => res.data)
  .catch(err => console.log(err))
  
}

export const getContact = (name) => {
  return Axios.get(`${BACKEND}/api/contacts/name`, {
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

export const getWebsiteWithToken = () => {
  return Axios.get(`${BACKEND}/api/site/config`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const getWebsiteFromProfile = (subdomain) => {
  return Axios.get(`${BACKEND}/api/site/`, {
    params: {
      subdomain
    }
  })
  .then(res => res.data)
}

export const getProfile = () => {
  return Axios.get(`${BACKEND}/api/profile/`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}

export const getStoriesUsedFromUser = () => {
  return Axios.get(`${BACKEND}/api/profile/stories_used`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}

export const getAuthorsMessaged = () => {
  return Axios.get(`${BACKEND}/api/profile/authors_messaged`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}

export const getInitialGreeting = () => {
  return Axios.get(`${BACKEND}/api/default_message`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}

export const getRepeatGreeting = () => {
  return Axios.get(`${BACKEND}/api/alt_message`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}