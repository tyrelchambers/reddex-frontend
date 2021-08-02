import React, { useState, useEffect } from "react";
import "./ConfirmModal.scss";
import { observer } from "mobx-react-lite";
import ConfirmMessages from "../ConfirmMessages/ConfirmMessages";
import { inject } from "mobx-react";
import QueueList from "../QueueList/QueueList";

const ConfirmModal = inject(
  "PostStore",
  "ModalStore"
)(
  observer(({ PostStore, ModalStore }) => {
    const [postData, setPostData] = useState([]);
    const { clientWidth } = document.body;
    useEffect(() => {
      const selectedPosts = PostStore.selectedPosts;
      PostStore.setSelectedPosts(selectedPosts);
      PostStore.setSelectedPost(selectedPosts[0]);

      if (clientWidth <= 426) {
        ModalStore.setIsSidebarOpen(false);
      }
    }, []);

    return (
      <>
        <div className="modal-header flex items-center justify-between w-full p-4">
          <p className="font-bold">Confirm your messages</p>
          <div className="flex items-center gap-6">
            <i
              className="fas fa-bars text-gray-600 close-modal"
              onClick={() =>
                ModalStore.setIsSidebarOpen(!ModalStore.isSidebarOpen)
              }
            ></i>
            <i
              className="fas fa-times text-gray-600"
              onClick={() => {
                ModalStore.setIsOpen(false);
              }}
            ></i>
          </div>
        </div>
        <div className="flex w-full h-full relative">
          <ConfirmMessages
            removeMessagedAuthor={() => {
              removeMessagedAuthor(postData, setPostData);
            }}
          />
          {ModalStore.isSidebarOpen && <QueueList />}
        </div>
      </>
    );
  })
);

const removeMessagedAuthor = (list, index, setPostData) => {
  const data = [...list];
  data.splice(index, 1);
  return setPostData([...data]);
};

export default ConfirmModal;
