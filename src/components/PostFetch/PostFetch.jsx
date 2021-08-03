import React, { useState, useEffect } from "react";
import "../SubredditSearch/SubredditSearch.scss";
import Loading from "../Loading/Loading";
import SubredditFilters from "../SubredditFilters/SubredditFilters";
import MessageAuthors from "../MessageAuthors/MessageAuthors";
import SubredditSearch from "../SubredditSearch/SubredditSearch";
import { inject, observer } from "mobx-react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import RecentlySearched from "../../layouts/RecenlySearched/RecentlySearched";
import Pagination from "@material-ui/lab/Pagination";
import StatusUI from "../../layouts/StatusUI/StatusUI";
import { getPostsFromReddit } from "../../api/getPostsFromReddit";
import { structureEndpoint } from "../../helpers/structureEndpoint";
import { formatPostsFromReddit } from "../../helpers/formatPostsFromReddit";
import { savePostsToDatabase } from "../../api/savePostsToDatabase";
import { usePostsFromDatabase } from "../../hooks/usePostsFromDatabase";
import SubredditPosts from "../SubredditPosts/SubredditPosts";
import { deleteExisitingPosts } from "../../api/deleteExistingPosts";
import { useUiState } from "../../hooks/useUiState";

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
    const {
      filters,
      addFilters,
      getPosts,
      post,
      resetFilters,
      clearPosts,
      setPosts,
    } = usePostsFromDatabase();
    const { uiState, updateUiState, resetState } = useUiState();

    useEffect(() => {
      const fn = async () => {
        await getPosts();
      };
      fn();
    }, [refetch]);

    // move into custom hook
    const executeFetch = async () => {
      const subreddit = PostStore.subreddit;

      const sr = subreddit.replace(/\s/g, "").trim().toLowerCase();
      if (!sr || sr.length === 0) return alert("Must include a subreddit");
      window.localStorage.setItem("subreddit", sr);

      clearPosts();

      updateUiState({ state: "deleting", message: "Deleting old posts..." });
      await deleteExisitingPosts();

      const endpoint = structureEndpoint({
        category: categoryState,
        subreddit: sr,
      });

      updateUiState({ state: "fetching", message: "Fetching from Reddit" });

      const results = await getPostsFromReddit({ endpoint });
      const formattedPosts = await formatPostsFromReddit(results);

      setPosts({
        subreddit: sr,
        posts: formattedPosts,
      });

      savePostsToDatabase({
        posts: formattedPosts,
        subreddit: sr,
      });

      resetState();
    };

    return (
      <div className="w-full">
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="fetch-inputs w-full md:max-w-xs max-w-none">
            <SubredditSearch
              categoryState={categoryState}
              setCategoryState={setCategoryState}
              uiState={uiState}
              fetch={executeFetch}
            />
            {post.posts.length > 0 && (
              <SubredditFilters
                setRefetch={setRefetch}
                filters={filters}
                addFilters={addFilters}
                resetFilters={resetFilters}
                filter={() => getPosts({ query: filters })}
              />
            )}
            {UserStore.getUser() && (
              <RecentlySearched executeFetch={executeFetch} />
            )}
          </div>

          <main className="flex flex-col w-full">
            <StatusUI status={uiState} />

            {uiState.state === "fetching" && (
              <div className="w-full flex justify-center">
                <Loading
                  title="Wrangling initial reddit posts..."
                  subtitle="This will take a second, hold tight"
                />
              </div>
            )}

            {post.posts.length > 0 && (
              <div className="d-f flex-col w-full">
                <MessageAuthors data={PostStore.selectedPosts} />
                <p className="subtle mb-2">
                  Showing posts from <strong>{post.subreddit}</strong>
                </p>

                <SubredditPosts posts={post.posts} />
                <Pagination
                  count={post.maxPages}
                  shape="rounded"
                  size="small"
                  onChange={(_, page) => {
                    getPosts({ page, query: filters });
                  }}
                />
              </div>
            )}

            {!post.posts.length && uiState === "pending" && (
              <p className="subtle ta-c ml-a mr-a">No posts found...</p>
            )}
          </main>
        </div>
        {ModalStore.isOpen && <ConfirmModal />}
      </div>
    );
  })
);

export default PostFetch;
