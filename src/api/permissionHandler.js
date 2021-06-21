import { getAxios } from ".";

export const permissionHandler = (bool, data) => {
  getAxios({
    url: "/profile/set_permission",
    method: "post",
    data: {
      author: data.dest,
      title: data.subject,
      permission: bool,
    },
  });
};
