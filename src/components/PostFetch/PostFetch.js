import React, { useState, useEffect } from "react";
import "../SubredditSearch/PostFetchComp.scss";
import Axios from "axios";
import Loading from "../Loading/Loading";
import SubredditFilters from "../SubredditFilters/SubredditFilters";
import MessageAuthors from "../MessageAuthors/MessageAuthors";
import SubredditSearch from "../SubredditSearch/SubredditSearch";
import { inject, observer } from "mobx-react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import RecentlySearched from "../../layouts/RecenlySearched/RecentlySearched";
import { getAxios } from "../../api/index";
import HR from "../HR/HR";
import SubredditPost from "../SubredditPost/SubredditPost";
import { toast } from "react-toastify";
import Pagination from "@material-ui/lab/Pagination";
import StatusUI from "../../layouts/StatusUI/StatusUI";
import { recentlySearched } from "../../api/recentlySearched";
import { getStoriesUsed } from "../../api/getStoriesUsed";

const PostFetch = inject(
  "UserStore",
  "ModalStore",
  "PostStore"
)(
  observer(({ UserStore, ModalStore, PostStore }) => {
    const [loading, setLoading] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState({
      category: "hot",
      timeframe: "day",
    });
    const [filterOptions, setFilterOptions] = useState({
      seriesOnly: false,
      upvotes: 0,
      operator: "",
      omitSeries: false,
      keywords: "",
      readTime: 0,
      readTimeOperator: "",
    });
    const [usedPosts, setUsedPosts] = useState([]);
    const [maxPages, setMaxPages] = useState();
    const [currentAction, setCurrentAction] = useState("");

    const token = window.localStorage.getItem("token");
    const vToken = window.localStorage.getItem("visitorToken");

    useEffect(() => {
      const fn = async () => {
        if (token) {
          const stories = await getStoriesUsed(token);
          if (stories) {
            setUsedPosts([...stories]);
          }
        }

        if (vToken) {
          await getPostsFromDatabase().then((res) => {
            if (res) {
              setMaxPages(res.maxPages);
              PostStore.setPosts(res.posts);
            }
          });
        }
      };
      fn();
    }, [refetch]);

    const isPostUsed = (post) => {
      for (let i = 0; i < usedPosts.length; i++) {
        if (usedPosts[i].post_id === post.post_id) {
          return true;
        }
      }
    };

    const executeFetch = async () => {
      if (!PostStore.subreddit) return;
      setLoading(true);
      recentlySearched(PostStore.subreddit);

      setCurrentAction("Deleting existing posts...");
      await getAxios({
        url: "/posts/delete",
        method: "delete",
        options: {
          withToken: false,
          withVisitorToken: true,
        },
      });

      await fetchPosts(PostStore.subreddit, categoryOptions);
      setCurrentAction("");
      PostStore.clearSelectedPosts();
    };

    const saveToDatabase = async (posts) => {
      await getAxios({
        url: "/posts/save",
        method: "post",
        data: posts,
        options: {
          withToken: false,
          withVisitorToken: true,
        },
      }).then((res) => {
        if (res) {
          PostStore.setPosts([...PostStore.posts, ...res]);
          return setLoading(false);
        }
      });
      return true;
    };

    const getPostsFromDatabase = async (page) => {
      const token =
        window.localStorage.getItem("token") ||
        window.localStorage.getItem("vToken") ||
        null;

      if (!token) return;
      const query = {
        ...(filterOptions.upvotes > 0 &&
          filterOptions.operator && {
            upvotes: filterOptions.upvotes,
            operator: filterOptions.operator,
          }),
        ...(filterOptions.readTime > 0 &&
          filterOptions.readTimeOperator && {
            readTime: filterOptions.readTime,
            readTimeOperator: filterOptions.readTimeOperator,
          }),
        ...(filterOptions.keywords && { keywords: filterOptions.keywords }),
        ...(filterOptions.seriesOnly && {
          seriesOnly: filterOptions.seriesOnly,
        }),
        ...(filterOptions.excludeSeries && {
          excludeSeries: filterOptions.excludeSeries,
        }),
      };

      return await getAxios({
        url: "/posts/",
        params: {
          page,
          ...query,
        },
        token,
      }).then((res) => {
        if (res) {
          return res;
        }
      });
    };

    const fetchPosts = async (subreddit, category) => {};

    const filter = async () => {
      if (filterOptions.upvotes && !filterOptions.operator) {
        return toast.error("No operator selected");
      }
      setLoading(true);
      await getPostsFromDatabase().then((res) => {
        PostStore.setPosts(res.posts);
        setMaxPages(res.maxPages);
        setLoading(false);
      });
    };

    return (
      <div className="post-fetch-wrapper">
        <div className="fetch-inputs w-100pr">
          <SubredditSearch
            categoryOptions={categoryOptions}
            setCategoryOptions={setCategoryOptions}
            currentAction={currentAction}
            setCurrentAction={setCurrentAction}
          />
          {!loading && (
            <SubredditFilters
              refetch={refetch}
              setRefetch={setRefetch}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              getPostsFromDatabase={getPostsFromDatabase}
              filter={filter}
            />
          )}
        </div>

        {UserStore.getUser() && (
          <RecentlySearched executeFetch={executeFetch} />
        )}

        <HR />
        <StatusUI status={currentAction} />

        {window.localStorage.getItem("subreddit") && (
          <p className="subtle mb+ mt-">
            Showing posts from{" "}
            <strong>{window.localStorage.getItem("subreddit")}</strong>{" "}
          </p>
        )}

        {PostStore.selectedPosts.length > 0 && UserStore.getUser() && (
          <MessageAuthors
            data={PostStore.selectedPosts}
            posts={PostStore.posts}
          />
        )}

        {currentAction && (
          <Loading
            title="Wrangling initial reddit posts..."
            subtitle="This will take a second, hold tight"
          />
        )}

        {console.log(PostStore.maxPages, "---")}
        {!currentAction && (
          <div className="d-f pagination-post-wrapper">
            <Pagination
              count={PostStore.maxPages}
              shape="rounded"
              onChange={(_, page) => {
                getPostsFromDatabase(page).then((res) => {
                  PostStore.setPosts(res.posts);
                });
              }}
            />

            <ul className="post-list">
              {PostStore.posts
                .slice(0, 25)
                .sort((a, b) => {
                  return b.created - a.created;
                })
                .map((x, id) => {
                  return (
                    <SubredditPost
                      key={id}
                      x={x}
                      onClickHandler={() => selectPost(x, PostStore)}
                      used={isPostUsed(x)}
                    />
                  );
                })}
            </ul>
          </div>
        )}

        {!PostStore.posts.length && !currentAction && (
          <p className="subtle ta-c ml-a mr-a">No posts found...</p>
        )}

        {ModalStore.isOpen && <ConfirmModal />}
      </div>
    );
  })
);

const selectPost = (x, PostStore) => {
  PostStore.setSelectedPosts(x);
};
export default PostFetch;
