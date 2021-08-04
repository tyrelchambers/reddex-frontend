import React from "react";
import "./Modal.scss";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

export const Modal = inject(
  "ModalStore",
  "PostStore"
)(
  observer(({ ModalStore }) => {
    if (!ModalStore.isOpen) return null;

    return (
      <div className="modal-wrapper ">
        <div className="modal-body overflow-hidden mx-4">
          {ModalStore.render}
        </div>
      </div>
    );
  })
);
