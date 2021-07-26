import React, { useState, useEffect } from "react";
import "../SubredditSearch/SubredditSearch.scss";
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
import Pagination from "@material-ui/lab/Pagination";
import StatusUI from "../../layouts/StatusUI/StatusUI";
import { getStoriesUsed } from "../../api/getStoriesUsed";
import { getPostsFromReddit } from "../../api/getPostsFromReddit";
import { structureEndpoint } from "../../helpers/structureEndpoint";
import { formatPostsFromReddit } from "../../helpers/formatPostsFromReddit";
import { savePostsToDatabase } from "../../api/savePostsToDatabase";

const PostFetch = inject(
  "UserStore",
  "ModalStore",
  "PostStore"
)(
  observer(({ UserStore, ModalStore, PostStore }) => {
    const [refetch, setRefetch] = useState(false);

    const [categoryState, setCategoryState] = useState({
      category: "hot",
      timeframe: "day",
    });
    const [filterState, setFilterState] = useState({
      seriesOnly: false,
      upvotes: "",
      operator: ">",
      omitSeries: false,
      keywords: "",
      readTime: "",
      readTimeOperator: "",
    });
    const [usedPosts, setUsedPosts] = useState([]);
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
              PostStore.setMaxPages(res.maxPages);
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

    const getPostsFromDatabase = async (page) => {
      const token =
        window.localStorage.getItem("token") ||
        window.localStorage.getItem("visitorToken") ||
        null;

      if (!token) return;
      const query = {
        ...(filterState.upvotes > 0 &&
          filterState.operator && {
            upvotes: filterState.upvotes,
            operator: filterState.operator,
          }),
        ...(filterState.readTime > 0 &&
          filterState.readTimeOperator && {
            readTime: filterState.readTime,
            readTimeOperator: filterState.readTimeOperator,
          }),
        ...(filterState.keywords && { keywords: filterState.keywords }),
        ...(filterState.seriesOnly && {
          seriesOnly: filterState.seriesOnly,
        }),
        ...(filterState.excludeSeries && {
          excludeSeries: filterState.excludeSeries,
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
    const deleteExisitingPosts = async () => {
      const token = window.localStorage.getItem("visitorToken");
      await getAxios({
        url: "/posts/delete",
        method: "delete",
        token,
      });
    };

    const executeFetch = async () => {
      const subreddit = PostStore.subreddit;

      const sr = subreddit.replace(/\s/g, "").trim().toLowerCase();
      if (!sr || sr.length === 0) return alert("Must include a subreddit");

      PostStore.setPosts([]);

      setCurrentAction("deleting posts");

      await deleteExisitingPosts();

      const endpoint = structureEndpoint({
        category: categoryState,
        subreddit: sr,
      });

      const results = await getPostsFromReddit({ endpoint });
      const formattedPosts = await formatPostsFromReddit(results);

      PostStore.setPosts(formattedPosts);
      PostStore.setMaxPages(Math.round(formattedPosts.length / 25));

      setCurrentAction();

      savePostsToDatabase({
        posts: formattedPosts,
        token:
          window.localStorage.getItem("token") ||
          window.localStorage.getItem("visitorToken"),
      });
    };

    const filter = async () => {
      await getPostsFromDatabase().then((res) => {
        PostStore.setPosts(res.posts);
        PostStore.setMaxPages(res.maxPages);
      });
    };

    return (
      <div className="w-full">
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="fetch-inputs w-full md:max-w-xs max-w-none">
            <SubredditSearch
              categoryState={categoryState}
              setCategoryState={setCategoryState}
              currentAction={currentAction}
              setCurrentAction={setCurrentAction}
              fetch={executeFetch}
            />

            {!currentAction && (
              <SubredditFilters
                setRefetch={setRefetch}
                filterState={filterState}
                setFilterState={setFilterState}
                filter={filter}
              />
            )}
          </div>

          {UserStore.getUser() && (
            <RecentlySearched executeFetch={executeFetch} />
          )}

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

          {currentAction && currentAction !== "deleting posts" && (
            <Loading
              title="Wrangling initial reddit posts..."
              subtitle="This will take a second, hold tight"
            />
          )}

          {!currentAction && (
            <div className="d-f flex-col w-full">
              <ul className="post-list grid xl:grid-cols-2 grid-cols-1 gap-4">
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
              <Pagination
                count={PostStore.maxPages}
                shape="rounded"
                onChange={(_, page) => {
                  getPostsFromDatabase(page).then((res) => {
                    PostStore.setPosts(res.posts);
                  });
                }}
              />
            </div>
          )}

          {!PostStore.posts.length && !currentAction && (
            <p className="subtle ta-c ml-a mr-a">No posts found...</p>
          )}
        </div>
        {ModalStore.isOpen && <ConfirmModal />}
      </div>
    );
  })
);

const selectPost = (x, PostStore) => {
  PostStore.setSelectedPosts(x);
};
export default PostFetch;
