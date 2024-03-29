import React, { useRef } from "react";
import "./SubredditSearch.css";
import { MainButton } from "../Buttons/Buttons";
import SelectField from "../SelectField/SelectField";
import { categoryOptions, timeframeOptions } from "./options";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

const SubredditSearch = ({
  PostStore,
  categoryState,
  setCategoryState,
  uiState,
  fetch,
}) => {
  const inputRef = useRef();
  const subreddit = PostStore.subreddit;

  return (
    <section className="w-full flex flex-col post-fetch-header">
      <div className=" w-full post-fetch-search mb-2 bg shadow-md">
        <p className="mb-4 font-bold text-sm">Enter subreddit</p>
        <div className="flex items-center mobile-fetch-inputs flex-col mt-4 gap-2">
          <div className="flex flex-1 h-12 w-full">
            <div className="preffix" style={{ height: "100%" }}>
              <p>r/</p>
            </div>
            <input
              type="text"
              className="form-input w-full  search-input post-fetch-search-input"
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
            className={`btn btn-primary w-full  ${
              subreddit.length === 0 ? "disabled" : ""
            }`}
            onClick={() => {
              fetch();
            }}
            disabled={uiState === "fetching"}
            loading={uiState === "fetching"}
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
