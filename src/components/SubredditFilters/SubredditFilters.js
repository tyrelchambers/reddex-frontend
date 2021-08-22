import React, { useState } from "react";
import "./SubredditFilters.css";
import { filterOptions, readtimeOptions } from "./filterOptions";
import SelectField from "../SelectField/SelectField";
import { MinimalButton } from "../Buttons/Buttons";
import { inject, observer } from "mobx-react";

const SubredditFilters = ({
  filters,
  addFilters,
  filter,
  setRefetch,
  resetFilters,
}) => {
  const [collapsed, setCollapsed] = useState(
    document.body.clientWidth <= 425 ? true : false
  );

  return (
    <div className="flex flex-col w-full filters-wrapper">
      {document.body.clientWidth <= 425 && (
        <MinimalButton
          onClick={() => setCollapsed(!collapsed)}
          classNames="mb-4 mt-4 bg"
        >
          {collapsed ? "Show Filters" : "Hide Filters"}
        </MinimalButton>
      )}
      {!collapsed && (
        <div className="flex flex-col filters gap-4 shadow-md">
          <div className=" flex" style={{ height: "100%" }}>
            <div className="flex w-full items-center inputs flex-col gap-4">
              <div className="flex flex-col flex-1 w-full">
                <p className="mb-4 font-bold text-sm">Sort by upvotes</p>
                <div className="flex flex-1 gap-4 flex-col">
                  <SelectField
                    options={filterOptions}
                    returnValue={(v) => addFilters({ operator: v })}
                  />

                  <input
                    type="number"
                    className="form-input"
                    placeholder="Upvote Count (default: 0)"
                    value={filters.upvotes}
                    onChange={(e) =>
                      addFilters({
                        upvotes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 w-full">
                <p className="mb-4 font-bold text-sm">
                  Sort by approximate read time (in minutes)
                </p>
                <div className="flex flex-1 gap-4 flex-col">
                  <SelectField
                    options={readtimeOptions}
                    returnValue={(v) => addFilters({ timeframe: v })}
                  />

                  <input
                    type="number"
                    className="form-input"
                    placeholder="ex: 5"
                    value={filters.readTime}
                    onChange={(e) =>
                      addFilters({
                        readTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <p className="mb-4 font-bold text-sm">
              Sort by exact phrase (ex: dark web)
            </p>
            <input
              type="text"
              className="form-input flex-1"
              placeholder="search phrase"
              value={filters.keywords}
              onChange={(e) => addFilters({ keywords: e.target.value })}
            />
          </div>
          <div className=" flex items-center">
            <div className="flex flex-col filter-actions">
              <p className="mb-4 font-bold text-sm">Filter actions</p>
              <div className="flex flex-col w-full gap-2">
                <button
                  className={`btn btn-tiertiary w-full ${
                    filters.seriesOnly ? "active" : ""
                  }`}
                  onClick={() =>
                    addFilters({
                      seriesOnly: !filters.seriesOnly,
                      omitSeries: false,
                    })
                  }
                >
                  Series Only
                </button>
                <button
                  className={`btn btn-tiertiary ${
                    filters.omitSeries ? "active" : ""
                  }`}
                  onClick={() =>
                    addFilters({
                      omitSeries: !filters.omitSeries,
                      seriesOnly: false,
                    })
                  }
                >
                  Exclude Series
                </button>

                <button
                  className="btn btn-tiertiary"
                  onClick={() => {
                    resetFilters();
                    setRefetch(true);
                  }}
                >
                  Reset Filters
                </button>
                <button
                  className="btn btn-secondary"
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
