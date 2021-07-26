import { inject, observer } from "mobx-react";
import React from "react";
import { removeTagFromStory } from "../../api/removeTagFromStory";
import { avgReadingTime } from "../../helpers/averageReadingTime";
import "./Story.scss";
const Story = ({ story, children }) => {
  return (
    <li className="story-item-wrapper rounded-md shadow-md flex flex-col p-4 gap-4 h-full">
      <a
        href={story.url}
        className="story-title font-bold"
        target="_blank"
        rel="noopener noreferrer"
      >
        {story.title}
      </a>
      <div className="h-full">
        <div className="flex flex-col gap-4">
          <a
            href={`https://www.reddit.com/user/${story.author}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" story-author flex items-center  "
            style={{ color: "inherit" }}
          >
            <i className="fas fa-user text-sm mr-4 icon-with-bg"></i>
            {story.author}
          </a>
          {story.subreddit && (
            <p className="flex items-center  story-subreddit">
              <i className="fas fa-folder text-sm mr-4 icon-with-bg"></i>
              {story.subreddit}
            </p>
          )}
          {story.self_text && (
            <p className="reading-time flex items-center  ">
              <i className="fas fa-clock mr-4 text-sm icon-with-bg"></i>
              {avgReadingTime(story.self_text)} minutes
            </p>
          )}
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
