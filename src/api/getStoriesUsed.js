import { getAxios } from ".";

export const getStoriesUsed = async (token) => {
  return await getAxios({
    url: "/profile/stories_used",
    token,
  });
};
