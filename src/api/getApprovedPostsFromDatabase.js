import { getAxios } from ".";

export const getApprovedPostsFromDatabase = (query) => {
  return getAxios({
    url: "/profile/reading_list?permission=true",
    params: {
      ...query,
    },
  }).then((res) => res.stories);
};
