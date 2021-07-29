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
    posts: [],
  });

  const addFilters = (f) => {
    setFilters({ ...filters, ...f });
  };

  const getPosts = async ({ page, query = {} } = {}) => {
    await getPostsFromDatabase({ page, query }).then((res) => {
      console.log(res, "##");
      setPost({ subreddit: res.post.subreddit, posts: res.post.posts });
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

  return { filters, addFilters, getPosts, post, resetFilters };
};
