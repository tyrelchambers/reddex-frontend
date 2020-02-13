import Axios from 'axios';
import { getAxios } from '../api';

export const renewRefreshToken = async () => {
  const encode = window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
  const token = await fetchTokens();
  const jwt = window.localStorage.getItem('token');

  if ( !token || !token.access_token ) return null;

  return await Axios.post('https://www.reddit.com/api/v1/access_token', 
    `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
  {
    headers: {
      "Authorization": `Basic ${encode}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    saveTokensToDb(res.data.access_token, token.refresh_token, jwt);
    return res.data
  })
  .catch(console.log);
}

export const getCurrentAuthenticatedUser = (token) => {

  return Axios.get('https://oauth.reddit.com/api/v1/me', {
    headers: {
      "Authorization": `bearer ${token}`
    }
  })
  .then(res => {
    return res.data
  })
  .catch(console.log);
}

export const fetchTokens = async () => {
  const _ = await getAxios({
    url: '/tokens/getTokens'
  })
  return _;
}

export const saveTokensToDb = async (access_token, refresh_token) => {
  getAxios({
    url: '/tokens/saveTokens',
    method: 'post',
    data: {
      access_token,
      refresh_token
    }
  })
}