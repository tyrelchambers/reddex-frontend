import { getAxios } from ".";

export const addToContacts = (user) => {
  getAxios({
    url: "/contacts/save",
    method: "post",
    data: { name: user.dest },
  });
};
