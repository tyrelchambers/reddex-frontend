import { getAxios } from ".";

export const saveAuthorToDb = async (name, post_id) => {
  return await getAxios({
    url: "/profile/saveAuthors",
    method: "post",
    data: {
      name,
      post_id,
    },
  });
};
