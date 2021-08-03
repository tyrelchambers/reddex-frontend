import { getAxios } from ".";

export const getUsersTags = async () => {
  return await getAxios({
    url: "/tags/",
  });
};
