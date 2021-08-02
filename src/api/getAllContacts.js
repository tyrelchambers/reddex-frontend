import { getAxios } from ".";

export const getAllContacts = async () => {
  return await getAxios({
    url: "/contacts/all",
  });
};
