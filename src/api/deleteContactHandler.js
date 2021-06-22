import { getAxios } from ".";

export const deleteContactHandler = (data) => {
  return getAxios({
    url: "/contacts/delete",
    method: "delete",
    params: {
      id: data,
    },
  });
};
