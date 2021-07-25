import { getAxios } from ".";

export const recentlySearched = (subreddit, token) => {
  getAxios({
    url: "/recently_searched",
    method: "post",
    token,
    data: {
      subreddit,
    },
  });
};
