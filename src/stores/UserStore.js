import { observable, action, decorate, toJS } from "mobx";
import Axios from "axios";
import { getAxios } from "../api";

class UserStore {
  currentUser = {};
  redditProfile = {};
  patron = {};

  setUser = async () => {
    const tkn = window.localStorage.getItem("token");
    if (!tkn) return null;

    const user = await getAxios({
      url: "/profile/auth",
      token: tkn,
    }).then((res) => {
      if (res) {
        return res;
      }
    });

    this.currentUser = user;
  };

  setCurrentUser(data) {
    this.currentUser = data;
  }

  setPatron(data) {
    this.patron = data;
  }

  getUser = () => {
    return isEmpty(this.currentUser) ? null : toJS(this.currentUser);
  };

  setRedditProfile(profile) {
    this.redditProfile = profile;
  }

  getRedditProfile() {
    return isEmpty(this.redditProfile) ? null : toJS(this.redditProfile);
  }

  setToken(token) {
    window.localStorage.setItem("token", token);
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

  signOut() {
    this.currentUser = {};
    return window.localStorage.removeItem("token");
  }

  getAccessToken = async (token) => {
    if (!token) return null;
    const encode = window.btoa(
      `${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`
    );
    const redditTokens = await Axios.post(
      "https://www.reddit.com/api/v1/access_token",
      `grant_type=authorization_code&code=${token}&redirect_uri=${process.env.REACT_APP_REDIRECT}/signup`,

      {
        headers: {
          Authorization: `Basic ${encode}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => {
        return res.data;
      })
      .catch(console.log);

    return redditTokens;
  };
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

decorate(UserStore, {
  currentUser: observable.shallow,
  loggedIn: observable,
  setUser: action,
  redditProfile: observable,
  setRedditProfile: action,
  setCurrentUser: action,
  patron: observable,
  setPatron: action,
});

export default new UserStore();
