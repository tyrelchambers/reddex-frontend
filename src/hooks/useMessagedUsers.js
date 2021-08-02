import { useState } from "react";
import { getMessagedAuthors } from "../api/getMessagedAuthors";

export const useMessagedUsers = () => {
  const [messagedUsers, setMessagedUsers] = useState([]);

  const getMessagedUsers = async () => {
    await getMessagedAuthors().then((res) => setMessagedUsers(res));
  };

  return { messagedUsers, getMessagedUsers };
};
