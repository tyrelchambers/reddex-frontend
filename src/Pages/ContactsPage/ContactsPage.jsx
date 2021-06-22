import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import "./ContactsPage.scss";
import { getAxios } from "../../api";
import { H1, H2, H1Subtitle } from "../../components/Headings/Headings";
import WithNav from "../../layouts/WithNav/WithNav";
import { Link } from "react-router-dom";
import { deleteContactHandler } from "../../api/deleteContactHandler";
import Contact from "../../components/Contact/Contact";
export const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [sortVal, setSortVal] = useState("");

  useEffect(() => {
    const fn = async () => {
      const c = await getAxios({
        url: "/contacts/all",
      });
      setContacts([...c]);
    };

    fn();
  }, []);

  const deleteHandler = async (data) => {
    const copy = contacts;

    const deleteItem = await deleteContactHandler(data);

    if (deleteItem === "OK") {
      contacts.filter((x, id) => {
        if (x.uuid === data) {
          copy.splice(id, 1);
          setContacts([...copy]);
        }
      });
    }
  };

  return (
    <Dashboard>
      <H1>Contacts</H1>
      <H1Subtitle>
        Create contacts in order to keep track of people you've contacted.
      </H1Subtitle>
      <WithNav>
        <div className="bg shadow-md ">
          <H2>Search by name</H2>
          <div className="d-f ai-c mt- contact-search">
            <Link
              to="/dashboard/contacts/new"
              className="ml- btn btn-tiertiary mr- h-100p p-"
            >
              <i className="fas fa-plus"></i>
              Add Contact
            </Link>

            <input
              type="text"
              className="search-large w-100pr max-w-xl"
              placeholder="Search contact list..."
              onChange={(e) => setSortVal(e.target.value)}
            />
          </div>
        </div>
        <section className=" mt+ flex flex-wrap gap-6 contact-list-wrapper">
          {contacts
            .filter((x) => x.name.toLowerCase().includes(sortVal.toLowerCase()))
            .map((x, id) => (
              <Contact contact={x} key={id} deleteHandler={deleteHandler} />
            ))}
        </section>
      </WithNav>
    </Dashboard>
  );
};
