import { useState } from "react";
import { getPostsFromDatabase } from "../api/getPostsFromDatabase";

export const usePostsFromDatabase = () => {
  const [filters, setFilters] = useState({
    seriesOnly: false,
    upvotes: "",
    operator: ">",
    omitSeries: false,
    keywords: "",
    readTime: "",
    readTimeOperator: ">",
  });
  const [post, setPost] = useState({
    subreddit: "",
    maxPages: 0,
    posts: [],
  });

  const addFilters = (f) => {
    setFilters({ ...filters, ...f });
  };

  const getPosts = async ({ page, query = {} } = {}) => {
    await getPostsFromDatabase({ page, query }).then((res) => {
      setPost({
        subreddit: res.post.subreddit,
        posts: res.post.posts,
        maxPages: res.maxPages,
      });
    });
  };

  const resetFilters = () => {
    setFilters({
      seriesOnly: false,
      upvotes: "",
      operator: ">",
      omitSeries: false,
      keywords: "",
      readTime: "",
      readTimeOperator: ">",
    });
  };

  const clearPosts = () => {
    setPost({
      subreddit: "",
      posts: [],
    });
  };

  const setPosts = ({ subreddit, posts }) => {
    setPost({
      subreddit,
      posts: posts.slice(0, 25),
    });
  };

  return {
    filters,
    addFilters,
    getPosts,
    post,
    resetFilters,
    clearPosts,
    setPosts,
  };
};
