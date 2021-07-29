import { getAxios } from ".";

export const deleteExisitingPosts = async () => {
  await getAxios({
    url: "/posts/delete",
    method: "delete",
  });
};
