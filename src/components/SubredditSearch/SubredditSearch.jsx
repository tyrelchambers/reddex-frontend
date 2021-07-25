import React, { useRef, useState } from "react";
import "./PostFetchComp.scss";
import { MainButton } from "../Buttons/Buttons";
import SelectField from "../SelectField/SelectField";
import { categoryOptions, timeframeOptions } from "./options";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { getPostsFromReddit } from "../../api/getPostsFromReddit";
import { structureEndpoint } from "../../helpers/structureEndpoint";
import { formatPostsFromReddit } from "../../helpers/formatPostsFromReddit";
import { getAxios } from "../../api";
import { savePostsToDatabase } from "../../api/savePostsToDatabase";

const SubredditSearch = ({
  loading,
  PostStore,
  setCurrentAction,
  currentAction,
}) => {
  const [categoryState, setCategoryState] = useState({
    category: "hot",
    timeframe: "day",
  });
  const inputRef = useRef();
  const subreddit = PostStore.subreddit;

  const executeFetch = async () => {
    const sr = subreddit.replace(/\s/g, "").trim().toLowerCase();
    if (!sr || sr.length === 0) return alert("Must include a subreddit");

    PostStore.setPosts([]);

    setCurrentAction("deleting posts");

    await deleteExisitingPosts();

    const endpoint = structureEndpoint({
      category: categoryState,
      subreddit: sr,
    });

    setCurrentAction(`fetching posts`);

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

  const deleteExisitingPosts = async () => {
    const token = window.localStorage.getItem("vToken");
    await getAxios({
      url: "/posts/delete",
      method: "delete",
      token,
    });
  };

  return (
    <section className="w-100pr d-f post-fetch-header">
      <div className=" w-100pr post-fetch-search mb- bg">
        <label className="form-label dark">Enter Subreddit</label>
        <div className="d-f ai-c h-10 mobile-fetch-inputs mt-- gap-4">
          <div className="d-f fx-1 h-100p">
            <div className="preffix" style={{ height: "100%" }}>
              <p>r/</p>
            </div>
            <input
              type="text"
              className="form-input w-100pr  search-input post-fetch-search-input"
              placeholder="subreddit"
              value={subreddit}
              onChange={(e) => PostStore.setSubreddit(e.target.value)}
              ref={inputRef}
            />
          </div>

          <SelectField
            options={categoryOptions}
            returnValue={(v) =>
              setCategoryState({ ...categoryState, category: v })
            }
          />
          {(categoryState.category === "top" ||
            categoryState.category === "controversial") && (
            <SelectField
              options={timeframeOptions}
              returnValue={(v) =>
                setCategoryState({ ...categoryState, timeframe: v })
              }
            />
          )}
          <MainButton
            className={`btn btn-primary  ${
              subreddit.length === 0 ? "disabled" : ""
            }`}
            onClick={() => {
              executeFetch();
            }}
            disabled={currentAction}
            loading={currentAction}
            value="Get Posts"
          >
            <i className="fas fa-sync"></i>
          </MainButton>
        </div>
      </div>
    </section>
  );
};

export default inject("PostStore")(observer(SubredditSearch));
