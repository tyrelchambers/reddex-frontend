import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import React from "react";
import QueueListUsers from "../QueueListUsers/QueueListUsers";
import "./QueueList.css";

const QueueList = ({ PostStore }) => {
  return (
    <div className="w-1/4 queue-list-wrapper p-2">
      <QueueListUsers
        posts={PostStore.selectedPosts}
        selectedPost={PostStore.selectedPost}
        setSelectedPost={(post) => PostStore.setSelectedPost(post)}
      />
    </div>
  );
};

export default inject("PostStore")(observer(QueueList));
