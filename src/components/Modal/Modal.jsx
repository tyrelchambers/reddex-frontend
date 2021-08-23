import React, { useEffect } from "react";
import "./Modal.css";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

export const Modal = inject(
  "ModalStore",
  "PostStore"
)(
  observer(({ ModalStore, title }) => {
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
          <div className="modal-header flex items-center justify-between w-full p-4">
            <p className="font-bold">{ModalStore.title}</p>
            <div className="flex items-center gap-6">
              {ModalStore.showSidebar && (
                <i
                  className="fas fa-bars text-gray-600 close-modal"
                  onClick={() =>
                    ModalStore.setIsSidebarOpen(!ModalStore.isSidebarOpen)
                  }
                ></i>
              )}
              <i
                className="fas fa-times text-gray-600"
                onClick={() => {
                  ModalStore.setIsOpen(false);
                }}
              ></i>
            </div>
          </div>
          {ModalStore.render}
        </div>
      </div>
    );
  })
);
