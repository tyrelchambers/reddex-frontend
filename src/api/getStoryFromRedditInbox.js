import { getAxios } from ".";

export const getStoryFromRedditInbox = (data) => {
  return getAxios({
    url: `/profile/get_story?title=${data.subject}&author=${data.dest}`,
  }).then((res) => res);
};
