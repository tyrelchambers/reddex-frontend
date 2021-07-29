import { getAxios } from ".";

export const setPostIsViewed = (post_id) => {
  return getAxios({
    url: "/posts/update",
    data: {
      post_id,
    },
    method: "put",
  }).then((res) => res);
};
