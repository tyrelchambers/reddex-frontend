import { getAxios } from ".";

export const removeStoryFromDb = (item) => {
  getAxios({
    url: "/profile/stories/remove",
    method: "delete",
    params: {
      uuid: item,
    },
  });
};
