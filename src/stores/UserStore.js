import { observable, action,decorate } from 'mobx';
import firebase from 'firebase';
import { createContext} from 'react';

class UserStore {
  currentUser = JSON.parse(window.localStorage.getItem('user'));

  setUser(user) {
    window.localStorage.setItem('user', JSON.stringify(user.user));
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
      console.log("Signed out");
      window.location.pathname = "/";
    }).catch(function(error) {
      console.log(error);
    });
  }
}

decorate(UserStore, {
  user: observable,
  setUser: action
});

export default createContext(new UserStore());