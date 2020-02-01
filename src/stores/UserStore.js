import { observable, action,decorate, toJS } from 'mobx';
import Axios from 'axios';

class UserStore {
  currentUser = {}
  redditProfile = {} || window.localStorage.getItem('reddit_profile')

  setUser = async () => {
    const tkn = window.localStorage.getItem("token");
    if ( !tkn ) return null;
    
    const user = await Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/auth`, {
      headers: {
        "token":tkn
      }
    })
    .then(res => res.data)
    .catch(err => {
      if (err.response) {
        if(err.response.data.err === "Auth token is old. Please sign in again.") {
          window.localStorage.clear();
          window.location.reload() 
        }
      }
    })
      
    
    this.currentUser = user;
  }

  setCurrentUser(data) {
    this.currentUser = data;
  }

  getUser = () => {
    return isEmpty(this.currentUser) ? null : toJS(this.currentUser);
  }

  setRedditProfile(profile) {
    this.redditProfile = profile;
  }

  getRedditProfile() {
    return isEmpty(this.redditProfile) ? null : toJS(this.redditProfile);
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
  setUser: action,
  redditProfile: observable,
  setRedditProfile: action,
  setCurrentUser: action
});

export default new UserStore();