import { getAxios } from ".";

export const getPostsFromDatabase = async ({ page, query }) => {
  return await getAxios({
    url: "/posts/",
    params: {
      page,
      ...query,
    },
  }).then((res) => res);
};
