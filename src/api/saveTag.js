import { getAxios } from ".";

export const saveTag = (tag) => {
  return getAxios({
    url: "/tags/save",
    method: "post",
    data: {
      tag,
    },
  }).then((res) => {
    return res;
  });
};
