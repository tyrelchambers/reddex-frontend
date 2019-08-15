import { observable, action,decorate, toJS } from 'mobx';
import Axios from 'axios';
import { toast } from 'react-toastify';


class UserStore {
  currentUser = {};

  setUser = async (token) => {
    const tkn = window.localStorage.getItem("token") || token;
    if ( !tkn ) return null;
    
    const user = await Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/auth`, {
      headers: {
        "token":tkn
      }
    })
    .then(res => res.data)
    .catch(console.log); 
    this.currentUser = user;
  }

  getUser = () => {
    return isEmpty(this.currentUser) ? null : toJS(this.currentUser);
  }

  setToken(token) {
    window.localStorage.setItem('token', token);
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  signOut() {
    this.currentUser = {};
    return window.localStorage.removeItem("token");
  }


  getAccessToken = async (token) => {
    if (!token) return null;
    const encode = window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
    const redditTokens = await Axios.post('https://www.reddit.com/api/v1/access_token', 
      `grant_type=authorization_code&code=${token}&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup`

    ,
    {
      headers: {
        "Authorization": `Basic ${encode}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      if (res.data.error) {
        return toast.error("Please re-authenticate");
      };
      return res.data;
    })
    .catch(console.log);

    return redditTokens;
  }
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

decorate(UserStore, {
  currentUser: observable.shallow,
  loggedIn: observable,
  setUser: action
});

export default new UserStore();