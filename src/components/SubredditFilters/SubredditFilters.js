import React, { useState } from "react";
import "./SubredditFilters.scss";
import { filterOptions, readtimeOptions } from "./filterOptions";
import SelectField from "../SelectField/SelectField";
import { MinimalButton } from "../Buttons/Buttons";
import { inject, observer } from "mobx-react";

const SubredditFilters = ({
  filterState,
  setFilterState,
  filter,
  setRefetch,
}) => {
  const [collapsed, setCollapsed] = useState(
    document.body.clientWidth <= 425 ? true : false
  );

  return (
    <div className="d-f fxd-c w-100pr filters-wrapper">
      {document.body.clientWidth <= 425 && (
        <MinimalButton
          onClick={() => setCollapsed(!collapsed)}
          classNames="mb-- mt-- bg"
        >
          {collapsed ? "Show Filters" : "Hide Filters"}
        </MinimalButton>
      )}
      {!collapsed && (
        <div className="d-f fxd-c filters">
          <div className=" d-f" style={{ height: "100%" }}>
            <div className="d-f w-100pr ai-c inputs">
              <div className="d-f fxd-c fx-1">
                <p className="mb-- font-bold text-sm">Sort by upvotes</p>
                <div className="d-f fx-1 gap-4">
                  <SelectField
                    options={filterOptions}
                    returnValue={(v) =>
                      setFilterState({ ...filterState, operator: v })
                    }
                  />

                  <input
                    type="number"
                    className="form-input"
                    placeholder="Upvote Count (default: 0)"
                    value={filterState.upvotes}
                    onChange={(e) =>
                      setFilterState({
                        ...filterState,
                        upvotes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="d-f fxd-c fx-1 ml-">
                <p className="mb-- font-bold text-sm">
                  Sort by approximate read time (in minutes)
                </p>
                <div className="d-f fx-1 gap-4">
                  <SelectField
                    options={readtimeOptions}
                    returnValue={(v) =>
                      setFilterState({ ...filterState, timeframe: v })
                    }
                  />

                  <input
                    type="number"
                    className="form-input"
                    placeholder="ex: 5"
                    value={filterState.readTime}
                    onChange={(e) =>
                      setFilterState({
                        ...filterState,
                        readTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-f fxd-c mt- mb- fx-1">
            <p className="mb-- font-bold text-sm">
              Sort by exact phrase (ex: dark web)
            </p>
            <input
              type="text"
              className="form-input fx-1"
              placeholder="search phrase"
              value={filterOptions.keywords}
              onChange={(e) =>
                setFilterState({ ...filterState, keywords: e.target.value })
              }
            />
          </div>
          <div className=" d-f ai-c mt-">
            <div className="d-f fxd-c filter-actions">
              <p className="mb-- font-bold text-sm">Filter actions</p>
              <div className="d-f fxw-w">
                <button
                  className={`btn btn-tiertiary ${
                    filterOptions.seriesOnly ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilterState({
                      ...filterState,
                      seriesOnly: !filterOptions.seriesOnly,
                    })
                  }
                >
                  Series Only
                </button>
                <button
                  className={`btn btn-tiertiary ${
                    filterOptions.excludeSeries ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilterState({
                      ...filterState,
                      excludeSeries: !filterOptions.excludeSeries,
                    })
                  }
                >
                  Exclude Series
                </button>

                <button
                  className="btn btn-tiertiary"
                  onClick={() => {
                    setFilterState({
                      seriesOnly: false,
                      upvotes: "",
                      operator: ">",
                      omitSeries: false,
                      keywords: "",
                      readTime: "",
                      readTimeOperator: "",
                    });
                    setRefetch(true);
                  }}
                >
                  Reset Filters
                </button>
                <button
                  className="btn btn-secondary ml-"
                  onClick={() => {
                    filter();
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default inject("PostStore")(observer(SubredditFilters));
