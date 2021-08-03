import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import React from "react";
import QueueListUsers from "../QueueListUsers/QueueListUsers";
import "./QueueList.css";

const QueueList = ({ PostStore, ModalStore }) => {
  const { clientWidth } = document.body;

  return (
    <div
      className={`queue-list-wrapper p-2 ${
        ModalStore.isSidebarOpen && clientWidth <= 768 ? "open" : ""
      }`}
    >
      <QueueListUsers
        posts={PostStore.selectedPosts}
        selectedPost={PostStore.selectedPost}
        setSelectedPost={(post) => PostStore.setSelectedPost(post)}
      />
    </div>
  );
};

export default inject("PostStore", "ModalStore")(observer(QueueList));
