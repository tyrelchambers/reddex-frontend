import React, { useRef, useState } from "react";
import "./PostFetchComp.scss";
import { MainButton } from "../Buttons/Buttons";
import SelectField from "../SelectField/SelectField";
import { categoryOptions, timeframeOptions } from "./options";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

const SubredditSearch = ({
  PostStore,
  categoryState,
  setCategoryState,
  currentAction,
  fetch,
}) => {
  const inputRef = useRef();
  const subreddit = PostStore.subreddit;

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
              fetch();
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
