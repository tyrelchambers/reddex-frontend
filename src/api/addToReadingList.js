import { getAxios } from ".";

export const addToReadingList = (data, bool) => {
  getAxios({
    url: "/profile/stories/completed",
    method: "post",
    data: {
      uuid: data.uuid,
      read: bool,
    },
  });
};
