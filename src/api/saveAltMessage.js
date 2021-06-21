import { getAxios } from ".";

export const saveAltMessage = (greeting) => {
  return getAxios({
    url: "/alt_message",
    method: "post",
    data: {
      text: greeting,
    },
  });
};
