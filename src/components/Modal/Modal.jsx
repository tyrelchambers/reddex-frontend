import React, { useEffect } from "react";
import "./Modal.css";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

export const Modal = inject(
  "ModalStore",
  "PostStore"
)(
  observer(({ ModalStore }) => {
    useEffect(() => {
      if (ModalStore.isOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [ModalStore.isOpen]);

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
