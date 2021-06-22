import { getAxios } from ".";

export const deleteHandler = (uuid) => {
  return getAxios({
    url: "/submitted/delete",
    method: "delete",
    params: {
      uuid,
    },
  }).then((res) => {
    if (res) {
      window.location.reload();
    }
  });
};
