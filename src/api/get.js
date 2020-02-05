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
    },
    params: {
      ...params
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data)
  
}


export const getImportedStory = (url) => {
  return Axios.get(url).then(res => res.data[0].data.children[0].data)
}

