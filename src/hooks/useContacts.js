import { useState } from "react";
import { getContact } from "../api/getContact";
export const useContacts = () => {
  const [contacts, setContacts] = useState();

  const fetchContact = async (name) => {
    await getContact({ author: name }).then((res) => setContacts(res));
  };

  return { contacts, fetchContact };
};
