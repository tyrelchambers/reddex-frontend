import { getAxios } from ".";

export const saveStoryToUser = async (data) => {
  return await getAxios({
    url: "/profile/save_story",
    method: "post",
    data,
  });
};
