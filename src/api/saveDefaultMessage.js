import { getAxios } from ".";

export const saveDefaultMessage = (greeting) => {
  return getAxios({
    url: "/default_message",
    method: "post",
    data: {
      text: greeting,
    },
  });
};
