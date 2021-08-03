import { getAxios } from ".";

export const getContact = async ({ author }) => {
  return await getAxios({
    url: "/contacts/name",
    params: {
      name: author,
    },
  });
};
