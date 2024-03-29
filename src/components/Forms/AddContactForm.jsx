import React from "react";
import "./forms.css";
import { MainButton } from "../Buttons/Buttons";

export const AddContactForm = ({ saveContact, stateHandler, state }) => {
  return (
    <div className="form with-bg p-4 rounded-lg shadow-md">
      <div className="field-group">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="John"
          name="name"
          value={state.name}
          onChange={(e) => stateHandler(e)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="notes" className="form-label">
          Notes
        </label>
        <textarea
          type="text"
          className="textarea"
          placeholder="Add your notes..."
          name="notes"
          value={state.notes}
          onChange={(e) => stateHandler(e)}
        />
      </div>

      <div className="flex justify-end">
        <MainButton className="btn btn-primary" onClick={saveContact}>
          <i className="fas fa-plus"></i>
          Save Contact
        </MainButton>
      </div>
    </div>
  );
};
