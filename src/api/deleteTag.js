import { getAxios } from ".";

export const deleteTag = (uuid) => {
  getAxios({
    url: `/tags/${uuid}`,
    method: "delete",
  }).then((res) => {
    if (res) {
      window.location.reload();
    }
  });
};
