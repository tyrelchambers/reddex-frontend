import { getAxios } from ".";

export const getMessagedAuthors = async () => {
  return await getAxios({
    url: "/profile/authors_messaged",
  });
};
