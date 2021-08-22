import React, { useState, useEffect } from "react";
import "./RecentlySearched.css";
import { getAxios } from "../../api";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

const RecentlySearched = ({ PostStore, executeFetch }) => {
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    getAxios({
      url: "/recently_searched",
      token,
    }).then((res) => {
      if (res) {
        setData([...res]);
      }
    });
  }, []);
  return (
    <div className="recently-searched mt-2 shadow-md">
      <p className="text-sm font-bold">Frequently Searched</p>

      <div className="flex items-center term-list">
        {data
          .sort((a, b) => b.count - a.count)
          .map((x, id) => (
            <p
              className="searched-term"
              key={id}
              onClick={() => {
                PostStore.setSubreddit(x.subreddit);
                executeFetch();
              }}
            >
              {x.subreddit}
            </p>
          ))}
      </div>
    </div>
  );
};

export default inject("PostStore")(observer(RecentlySearched));
