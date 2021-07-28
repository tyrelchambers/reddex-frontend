import { getAxios } from ".";

export const checkForUsedStories = async (token) => {
  return await getAxios({
    url: "/profile/stories_used",
    token,
  });
};
