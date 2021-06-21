import { inject, observer } from "mobx-react";
import React from "react";
import { removeTagFromStory } from "../../api/removeTagFromStory";
import { avgReadingTime } from "../../helpers/averageReadingTime";

const Story = ({ story, children }) => {
  return (
    <li className="reading-list-item-wrapper rounded-md shadow-md flex flex-col p-4 gap-4 h-full">
      <a
        href={story.url}
        className="reading-list-title font-bold"
        target="_blank"
        rel="noopener noreferrer"
      >
        {story.title}
      </a>
      <div className="h-full">
        <div className="flex flex-wrap gap-4">
          <a
            href={`https://www.reddit.com/user/${story.author}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" reading-list-author flex items-center text-gray-700 "
            style={{ color: "inherit" }}
          >
            <i className="fas fa-user text-sm mr-4 "></i>
            {story.author}
          </a>
          <p className="flex items-center text-gray-700 reading-list-subreddit">
            <i className="fas fa-folder text-sm mr-4 "></i>
            {story.subreddit}
          </p>
          <p className="reading-time flex items-center text-gray-700 ">
            <i className="fas fa-clock mr-4 text-sm "></i>
            {avgReadingTime(story.self_text)} minutes
          </p>
        </div>
      </div>
      <div className="tag-list flex items-center" id="tagList">
        {story.Tags && story.Tags.length > 0 && (
          <>
            <i className="fas fa-tag text-sm mr-4"></i>
            {story.Tags.map((t, id) => {
              return (
                <p
                  className="font-bold"
                  key={id}
                  onClick={() => removeTagFromStory(t)}
                >
                  {t.tag}
                </p>
              );
            })}
          </>
        )}
      </div>
      <hr />
      {children}
    </li>
  );
};

export default inject("ReadingListStore", "ModalStore")(observer(Story));
