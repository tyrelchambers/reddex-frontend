import { observable, action,decorate, toJS } from 'mobx';
import Axios from 'axios';


class UserStore {
  currentUser = null;

  setUser = async (token) => {
    const tkn = window.localStorage.getItem("token") || token;
    if ( !tkn ) return null;
    
    const user = await Axios.get('http://localhost:3001/api/profile/auth', {
      headers: {
        "token":tkn
      }
    })
    .then(res => res.data)
    .catch(console.log); 

    this.currentUser = user;
  }

  getUser = () => {
    return toJS(this.currentUser);
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


  getAccessToken = async (token, callback) => {
    const encode = window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
    await Axios.post('https://www.reddit.com/api/v1/access_token', 
      `grant_type=authorization_code&code=${token}&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup`

    ,
    {
      headers: {
        "Authorization": `Basic ${encode}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => window.localStorage.setItem('reddit_tokens', JSON.stringify({
      access_token: res.data.access_token,
      refresh_token: res.data.refresh_token
    })))
    .catch(console.log);

    callback();
  }

  
}

decorate(UserStore, {
  currentUser: observable,
  loggedIn: observable,
  setUser: action
});

export default new UserStore();