import { saveSubredditToLocalStorage } from './PostFetch';

test("Subreddit saves to localstorage", () => {
  saveSubredditToLocalStorage("nosleep");
  expect(window.localStorage.getItem("subreddit")).toBe("nosleep");
});