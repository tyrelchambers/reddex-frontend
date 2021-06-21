import React from "react";
import isEmpty from "../../helpers/objIsEmpty";
import { H3 } from "../Headings/Headings";

const ReadingListFilters = (props) => {
  return (
    <div className="reading-list-filters d-f fxd-c jc-c mt-4 mb-2">
      {props.initialHeaders.length > 0 && (
        <>
          <H3>Sort by subreddit</H3>
          <div className="header-items">
            {props.subredditFilter && (
              <i
                className="fas fa-times ml- mr-"
                onClick={() => props.setSubredditFilter("")}
              ></i>
            )}
            {props.initialHeaders.map((x, id) => (
              <button
                key={id}
                className={`reading-list-filter ${
                  props.subredditFilter === x ? "active" : ""
                }`}
                onClick={() => props.setSubredditFilter(x)}
              >
                {x}
              </button>
            ))}
          </div>
        </>
      )}

      {props.tags.length > 0 && (
        <>
          <div className="mt">
            <H3>Sort by tags</H3>
          </div>
          <div className="header-items">
            {!isEmpty(props.tag) && (
              <i
                className="fas fa-times ml- mr-"
                onClick={() => props.setTag("")}
              ></i>
            )}
            {props.tags.map((x, id) => (
              <button
                key={id}
                className={`reading-list-filter ${
                  props.tag.tag === x.tag ? "active" : ""
                }`}
                onClick={() => props.setTag(x)}
              >
                {x.tag}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReadingListFilters;
