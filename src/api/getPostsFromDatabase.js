import { getAxios } from ".";

export const getPostsFromDatabase = (query) => {
  return getAxios({
    url: "/profile/reading_list?permission=true",
    params: {
      ...query,
    },
  }).then((res) => {
    if (res) {
      return res.stories;
    }
  });
};
