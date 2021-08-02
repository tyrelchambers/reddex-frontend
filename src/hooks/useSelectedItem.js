import { useState } from "react";

export const useSelectedItem = () => {
  const [selectedPost, setSelectedPost] = useState();
  const [list, setList] = useState([]);

  const setSelected = (post) => {
    setSelectedPost(post);
  };

  const setPostList = (data) => {
    setList(data);
  };

  return { selectedPost, setSelected, setPostList, list };
};
