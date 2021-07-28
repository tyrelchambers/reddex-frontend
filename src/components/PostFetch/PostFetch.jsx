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
import SubredditPost from "../SubredditPost/SubredditPost";
import Pagination from "@material-ui/lab/Pagination";
import StatusUI from "../../layouts/StatusUI/StatusUI";
import { checkForUsedStories } from "../../api/checkForUsedStories";
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

    useEffect(() => {
      const fn = async () => {
        if (token) {
          await checkForUsedStories(token).then((res) =>
            setUsedPosts([...res.stories])
          );
        }

        // check api response
        await getPostsFromDatabase().then((res) => {
          if (res) {
            PostStore.setMaxPages(res.maxPages);
            PostStore.setPosts(res.posts);
          }
        });
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

    // move to own function file. params: page, query
    const getPostsFromDatabase = async (page) => {
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

    // move into custom hook
    const executeFetch = async () => {
      const subreddit = PostStore.subreddit;

      const sr = subreddit.replace(/\s/g, "").trim().toLowerCase();
      if (!sr || sr.length === 0) return alert("Must include a subreddit");
      window.localStorage.setItem("subreddit", sr);

      PostStore.setPosts([]);

      setCurrentAction("deleting posts");

      await deleteExisitingPosts();
      setCurrentAction("fetching");

      const endpoint = structureEndpoint({
        category: categoryState,
        subreddit: sr,
      });

      const results = await getPostsFromReddit({ endpoint });
      const formattedPosts = await formatPostsFromReddit(results);

      PostStore.setPosts(formattedPosts);
      PostStore.setMaxPages(Math.round(formattedPosts.length / 25));
      setCurrentAction("loaded");

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

            {PostStore.posts.length > 0 && (
              <SubredditFilters
                setRefetch={setRefetch}
                filterState={filterState}
                setFilterState={setFilterState}
                filter={filter}
              />
            )}
            {UserStore.getUser() && (
              <RecentlySearched executeFetch={executeFetch} />
            )}
          </div>

          <StatusUI status={currentAction} />

          {currentAction === "fetching" && (
            <div className="w-full flex justify-center">
              <Loading
                title="Wrangling initial reddit posts..."
                subtitle="This will take a second, hold tight"
              />
            </div>
          )}

          {PostStore.posts.length > 0 && (
            <div className="d-f flex-col w-full">
              {/* move check into <messageauthors /> */}
              {PostStore.selectedPosts.length > 0 && UserStore.getUser() && (
                <MessageAuthors
                  data={PostStore.selectedPosts}
                  posts={PostStore.posts}
                />
              )}

              {/* move into mongoDb with posts */}
              {window.localStorage.getItem("subreddit") && (
                <p className="subtle mb-2">
                  Showing posts from{" "}
                  <strong>{window.localStorage.getItem("subreddit")}</strong>{" "}
                </p>
              )}

              {/* move into <SubredditPosts /> */}
              <ul className="post-list grid xl:grid-cols-2 grid-cols-1 gap-2">
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
