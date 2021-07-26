import React from "react";
import "./Announcement.scss";
import announcements from "./announcements";

const Announcement = () => {
  if (window.localStorage.getItem("announcement")) {
    window.localStorage.removeItem("announcement");
  }

  const { title, body } = announcements["patreon"];

  return (
    <div className="d-f w-100pr announcement">
      <div className="d-f announcement-content ai-c max-w-screen-xl w-full ml-auto mr-auto">
        <h4 className="announcement-title">{title}</h4>
        <p
          className="announcement-body"
          dangerouslySetInnerHTML={{ __html: body }}
        ></p>
      </div>
    </div>
  );
};

export default Announcement;
