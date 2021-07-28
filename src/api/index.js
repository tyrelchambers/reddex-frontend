import Axios from "axios";
import { toast } from "react-toastify";

const BACKEND = process.env.REACT_APP_BACKEND;

export const getAxios = async ({
  method = "get",
  data = {},
  params = {},
  url = "",
  token = window.localStorage.getItem("token") ||
    window.localStorage.getItem("visitorToken") ||
    null,
} = {}) => {
  return await Axios({
    method,
    url: `${BACKEND}/api${url}`,
    data,
    headers: {
      ...(token && { token }),
    },
    params: {
      ...params,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data);
        if (
          err.response.data.err === "Auth token is old. Please sign in again."
        ) {
          window.localStorage.clear();
          window.location.pathname = "/login";
        }
        if (err.response.data === "Visitor token invalid") {
          window.localStorage.removeItem("visitorToken");
          window.location.reload();
        }
      }
      return false;
    });
};
