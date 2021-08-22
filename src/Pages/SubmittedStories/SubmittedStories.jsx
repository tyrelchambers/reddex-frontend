import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { getAxios } from "../../api";
import { H1 } from "../../components/Headings/Headings";
import WithNav from "../../layouts/WithNav/WithNav";
import Story from "../../components/Story/Story";
import { deleteHandler } from "../../api/deleteStoryHandler";
import { MinimalButton } from "../../components/Buttons/Buttons";

const SubmittedStories = () => {
  const [state, setState] = useState([]);
  const [sortVal, setSortVal] = useState("");

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/submitted/",
      }).then((res) => {
        if (res) {
          setState([...res]);
        }
      });
    };

    fn();
  }, []);

  const stories = state
    .filter((x) => {
      if (
        (x.story_title &&
          x.story_title.toLowerCase().includes(sortVal.toLowerCase())) ||
        (x.author && x.author.toLowerCase().includes(sortVal.toLowerCase())) ||
        (x.tags && x.tags.toLowerCase().includes(sortVal.toLowerCase()))
      ) {
        return x;
      }
    })
    .reverse()
    .map((x, id) => (
      <Story
        story={{
          title: x.story_title,
          ...x,
        }}
        key={id}
      >
        <div className="gap-4 flex">
          <MinimalButton
            onClick={() =>
              (window.location.pathname = `/dashboard/story/id=${x.uuid}`)
            }
          >
            View
          </MinimalButton>
          <MinimalButton
            classNames="danger-text"
            onClick={() => {
              deleteHandler(x.uuid);
            }}
          >
            Delete
          </MinimalButton>
        </div>
      </Story>
    ));

  return (
    <Dashboard>
      <H1>Submitted Stories</H1>
      <WithNav>
        <div className="bg mb-10 shadow-md">
          <p className="font-bold ">Sort by title, author, or tags</p>
          <input
            type="text"
            className="search-large w-full max-w-xl mt-2"
            placeholder="Search by title, author, or tags..."
            onChange={(e) => setSortVal(e.target.value.toLowerCase())}
          />
        </div>

        <ul className="reading-list-list grid grid-cols-3 gap-4 mt-2">
          {stories}
        </ul>
      </WithNav>
    </Dashboard>
  );
};

export default SubmittedStories;
