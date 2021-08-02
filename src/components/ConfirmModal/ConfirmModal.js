import React, { useState, useEffect } from "react";
import "./ConfirmModal.scss";
import { observer } from "mobx-react-lite";
import ConfirmMessages from "../ConfirmMessages/ConfirmMessages";
import { inject } from "mobx-react";
import QueueList from "../QueueList/QueueList";

const ConfirmModal = inject("PostStore")(
  observer(({ PostStore }) => {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
      const selectedPosts = PostStore.selectedPosts;
      PostStore.setSelectedPosts(selectedPosts);
      PostStore.setSelectedPost(selectedPosts[0]);
    }, []);

    return (
      <div className="flex modal-inner-body w-full">
        <ConfirmMessages
          removeMessagedAuthor={() => {
            removeMessagedAuthor(postData, setPostData);
          }}
        />
        <QueueList />
      </div>
    );
  })
);

const removeMessagedAuthor = (list, index, setPostData) => {
  const data = [...list];
  data.splice(index, 1);
  return setPostData([...data]);
};

export default ConfirmModal;
