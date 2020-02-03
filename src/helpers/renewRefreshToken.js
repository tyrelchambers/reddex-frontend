import Axios from 'axios';
import { toast } from 'react-toastify';

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
  const token = window.localStorage.getItem("token");

  const _ = await Axios.get(`${process.env.REACT_APP_BACKEND}/api/tokens/getTokens`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
  .catch(err => toast.error(err.response.data));

  return _;
}

export const saveTokensToDb = async (access_token, refresh_token, token) => {
  await Axios.post(`${process.env.REACT_APP_BACKEND}/api/tokens/saveTokens`, {
    access_token,
    refresh_token
  }, {
    headers: {
      token
    }
  })
  .then()
  .catch(console.log);
}