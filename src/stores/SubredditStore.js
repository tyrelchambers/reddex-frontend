import { observable, action,decorate } from 'mobx';
import { createContext } from 'react';

class SubredditStore {
  subreddits = []

  setSubreddits(subs) {
    this.subreddits = subs;
  }
}

decorate(SubredditStore, {
  subreddits: observable,
  setSubreddits: action
});
export default createContext(new SubredditStore());