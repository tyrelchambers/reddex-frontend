import React from "react";
import "./ReadingList.scss";
import { getAxios } from "../../../api";
import Story from "../../../components/Story/Story";
import { MinimalButton } from "../../../components/Buttons/Buttons";
import { addToReadingList } from "../../../api/addToReadingList";

const CompletedStories = ({
  list,
  ReadingListStore,
  callback,
  removeStoryFromDb,
}) => {
  if (!list) return null;

  return (
    <ul className="reading-list-list grid grid-cols-3 gap-4 mt- ">
      {list.map((x) => (
        <Story story={x}>
          <div className="flex items-center gap-6">
            <MinimalButton
              onClick={() => {
                addToReadingList(x, false);

                callback(x);
              }}
            >
              Add back to Read List
            </MinimalButton>

            <MinimalButton
              onClick={() => {
                ReadingListStore.removeStoryFromList("completed", x.post_id);
                removeStoryFromDb(x.uuid);
              }}
            >
              Permanently delete
            </MinimalButton>
          </div>
        </Story>
      ))}
    </ul>
  );
};

export default CompletedStories;
