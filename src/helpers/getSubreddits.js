import Axios from 'axios'
import dateFns, {  differenceInCalendarMonths, differenceInMonths, differenceInSeconds } from 'date-fns';

export const getSubreddits = async () => {
  console.log('called')

  let endpoint = "subreddits.json";

  const link = `https://www.reddit.com/${endpoint}`;
  let subreddits = [];
  let after = ``;

  for ( let i = 0; after !== null; i++ ) {
    await Axios.get(`${link}?after=${after}`).then(res => {
      after = res.data.data.after;
      subreddits = [...subreddits, ...res.data.data.children];
    }).catch(err => err);
  }

  window.localStorage.setItem("subreddit_date_pulled", new Date(Date.now()));

  deletePostsCollection();
  saveSubredditToDatabase(subreddits)
  return true;
}


export const deletePostsCollection = () => {
  const db = window.db;
  db.subreddits.clear().then().catch();
}


const saveSubredditToDatabase = async (data) => {  
  await data.map(x => {
    return window.db.subreddits.add({
      subreddit: x.data.display_name
    });
  });
  return true;
}