import { getAxios } from ".";

export const recentlySearched = (subreddit) => {
  getAxios({
    url: "/recently_searched",
    method: "post",
    data: {
      subreddit,
    },
  });
};
