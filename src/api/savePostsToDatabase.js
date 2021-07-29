import { getAxios } from ".";

export const savePostsToDatabase = async ({ posts, subreddit }) => {
  return await getAxios({
    url: "/posts/save",
    method: "post",
    data: {
      posts,
      subreddit,
    },
  })
    .then((res) => res)
    .catch((err) => err);
};
