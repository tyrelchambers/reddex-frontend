import React from "react";
import "./ReadingList.css";
import Story from "../../../components/Story/Story";
import { MinimalButton } from "../../../components/Buttons/Buttons";
import { addToReadingList } from "../../../api/addToReadingList";
import { inject, observer } from "mobx-react";
import { removeStoryFromDb } from "../../../api/removeStoryFromDb";

const CompletedStories = ({ list, ReadingListStore }) => {
  if (!list) return null;

  return (
    <ul className="reading-list-list grid grid-cols-3 gap-4 mt-2 ">
      {list.map((x) => (
        <Story story={x}>
          <div className="flex items-center gap-6">
            <MinimalButton
              onClick={() => {
                addToReadingList(x, false);

                ReadingListStore.transferStoryFromList(
                  x,
                  "completed",
                  "toRead"
                );
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

export default inject("ReadingListStore")(observer(CompletedStories));
