import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { checkForUsedStories } from "../../api/checkForUsedStories";
import SubredditPost from "../SubredditPost/SubredditPost";

const SubredditPosts = ({ posts }) => {
  const [usedPosts, setUsedPosts] = useState([]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const fn = async () => {
      if (token) {
        await checkForUsedStories(token).then((res) =>
          setUsedPosts(res.stories)
        );
      }
    };
    fn();
  }, []);

  return (
    <ul className="post-list grid xl:grid-cols-2 grid-cols-1 gap-2">
      {posts
        .slice(0, 25)
        .sort((a, b) => {
          return b.created - a.created;
        })
        .map((x, id) => {
          return <SubredditPost key={id} x={x} usedPosts={usedPosts} />;
        })}
    </ul>
  );
};

export default inject("PostStore")(observer(SubredditPosts));
