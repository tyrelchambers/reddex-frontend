import React from "react";
import "./MessageAuthors.css";
import { observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const MessageAuthors = inject(
  "ModalStore",
  "PostStore"
)(
  observer(({ data, ModalStore, PostStore }) => {
    if (PostStore.selectedPosts.length === 0) return null;

    return (
      <div className="shadow-md mb-4 bg w-full flex justify-between gap-4 items-center p-4 message-author-wrapper">
        <h3 className="font-bold">
          You've selected {data.length} author(s) to message.
        </h3>
        <div className="flex gap-4 items-center">
          <button
            className="btn minimal-btn"
            onClick={() => PostStore.clearSelectedPosts()}
          >
            Deselect All
          </button>
          <button
            className="btn btn-primary "
            onClick={() => {
              ModalStore.setIsOpen(true);
              ModalStore.setRender(<ConfirmModal />);
            }}
          >
            Confirm Messages
          </button>
        </div>
      </div>
    );
  })
);

export default MessageAuthors;
