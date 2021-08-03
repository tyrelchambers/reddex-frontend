import axios from "axios";
import { toast } from "react-toastify";

export const sendMessageToAuthor = async ({ link, body, access_token }) => {
  await axios
    .post(link, body, {
      headers: {
        Authorization: `bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then()
    .catch((err) => {
      if (err) {
        toast.error("Something went wrong");
      }
    });
};
