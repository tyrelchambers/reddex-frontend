import { useState } from "react";
import { getContact } from "../api/getContact";
export const useContact = () => {
  const [contact, setContact] = useState();

  const fetchContact = async (name) => {
    await getContact({ author: name }).then((res) => setContact(res));
  };

  return { contact, fetchContact };
};
