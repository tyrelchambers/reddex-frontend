import { getAxios } from ".";

export const removeTagFromStory = (t) => {
  getAxios({
    url: "/tag_story/remove",
    method: "delete",
    data: {
      tag: t,
    },
  }).then((res) => {
    if (res) {
      window.location.reload();
    }
  });
};
