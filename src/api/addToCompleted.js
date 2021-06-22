import { getAxios } from ".";

export const addToCompleted = (data, bool) => {
  getAxios({
    url: "/profile/stories/completed",
    method: "post",
    data: {
      uuid: data.uuid,
      read: bool,
    },
  });
};
