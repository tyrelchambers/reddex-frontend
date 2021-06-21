import { toast } from "react-toastify";
import { getAxios } from ".";

export const deleteHandler = (uuid) => {
  getAxios({
    url: "/submitted/delete",
    method: "delete",
    params: {
      uuid,
    },
  }).then((res) => {
    if (res) {
      toast.success(res);
      window.location.reload();
    }
  });
};
