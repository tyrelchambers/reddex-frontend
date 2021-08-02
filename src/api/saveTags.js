import { getAxios } from ".";

export const saveTags = ({ story_uuid, tagsToAdd }) => {
  return getAxios({
    url: "/tag_story/save",
    method: "post",
    data: {
      story_uuid,
      tags: tagsToAdd,
    },
  });
};
