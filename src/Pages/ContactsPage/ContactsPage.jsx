import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import "./ContactsPage.scss";
import { getAxios } from "../../api";
import { H1, H2, H1Subtitle } from "../../components/Headings/Headings";
import WithNav from "../../layouts/WithNav/WithNav";
import { Link } from "react-router-dom";
import { deleteContactHandler } from "../../api/deleteContactHandler";
import Contact from "../../components/Contact/Contact";
import { getAllContacts } from "../../api/getAllContacts";
export const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [sortVal, setSortVal] = useState("");

  useEffect(() => {
    const fn = async () => {
      const c = await getAllContacts();
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
          <div className="d-f ai-c mt- contact-search gap-2">
            <input
              type="text"
              className="search-large w-full "
              placeholder="Search contact list..."
              onChange={(e) => setSortVal(e.target.value)}
            />
            <Link to="/dashboard/contacts/new" className=" btn btn-primary ">
              <i className="fas fa-plus"></i>
              Add Contact
            </Link>
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
