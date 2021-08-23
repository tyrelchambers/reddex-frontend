import React, { useEffect } from "react";
import "./ConfirmModal.css";
import { observer } from "mobx-react-lite";
import ConfirmMessages from "../ConfirmMessages/ConfirmMessages";
import { inject } from "mobx-react";
import QueueList from "../QueueList/QueueList";

const ConfirmModal = inject(
  "PostStore",
  "ModalStore"
)(
  observer(({ PostStore, ModalStore }) => {
    const { clientWidth } = document.body;

    useEffect(() => {
      const selectedPosts = PostStore.selectedPosts;
      PostStore.setSelectedPosts(selectedPosts);
      PostStore.setSelectedPost(selectedPosts[0]);

      if (clientWidth <= 768) {
        ModalStore.setIsSidebarOpen(false);
      }
    }, []);

    return (
      <>
        <div className="flex w-full h-full relative">
          <ConfirmMessages />
          {ModalStore.isSidebarOpen && <QueueList />}
        </div>
      </>
    );
  })
);

export default ConfirmModal;
