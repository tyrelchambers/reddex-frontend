import React from "react";
import { Link } from "react-router-dom";
import "./Contact.scss";
import { MinimalButton } from "../Buttons/Buttons";
const Contact = ({ contact, deleteHandler }) => {
  return (
    <div className="contact-list-item p-4 rounded-md shadow-md ">
      <p className="text-lg font-bold">
        <i className="fas fa-user mr-2 text-sm"></i>
        {contact.name}
      </p>

      {contact.notes && (
        <p className="mb-6 mt-2 break-words">{contact.notes}</p>
      )}
      {!contact.notes && <p className="mb-6 mt-2">No notes on contact</p>}
      <div className="flex gap-6">
        <MinimalButton>
          <Link to={`/dashboard/contacts/${contact.uuid}/edit`}>
            Edit Contact
          </Link>
        </MinimalButton>
        <MinimalButton onClick={() => deleteHandler(contact.uuid)}>
          Delete contact
        </MinimalButton>
      </div>
    </div>
  );
};

export default Contact;
