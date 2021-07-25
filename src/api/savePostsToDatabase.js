import { getAxios } from ".";

export const savePostsToDatabase = async ({ posts, token }) => {
  return await getAxios({
    url: "/posts/save",
    method: "post",
    data: posts,
    token,
  })
    .then((res) => res)
    .catch((err) => err);
};
