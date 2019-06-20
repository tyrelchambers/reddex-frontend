import { observable, action,decorate } from 'mobx';
import firebase from 'firebase';
import { createContext} from 'react';
import Axios from 'axios';
class UserStore {
  currentUser = JSON.parse(window.localStorage.getItem('user'));

  setUser(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }
 
  getUser() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.localStorage.setItem('user', JSON.stringify(user));
      } else {
        window.localStorage.removeItem('user'); 
      }
    });
    return this.currentUser;
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      window.location.pathname = "/";
    }).catch(function(error) {
      console.log(error);
    });
  }

  getUserProfile = (uid) => {
    const db = firebase.firestore();
    const dfMsg = document.querySelector("#defaultMessageHolder");
    
    const profile = db.collection("users").doc(uid).get().then((doc) => {
      if (doc.exists) {
        dfMsg.innerHTML = doc.data().defaultMessage;
        window.localStorage.setItem("default_message", doc.data().defaultMessage);
      } else {
          // doc.data() will be undefined in this case
        return false;
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
  
    return profile
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
  user: observable,
  loggedIn: observable,
  setUser: action
});

export default createContext(new UserStore());