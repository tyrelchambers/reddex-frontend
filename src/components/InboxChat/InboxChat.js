import React, { useState, useEffect } from "react";
import moment from "moment";
import dateFns from "date-fns";
import "./InboxChat.css";
import "../Buttons/buttons.css";
import SendChatForm from "../Forms/SendChatForm";

const InboxChat = ({ data, UserStore }) => {
  const [chatLogs, setChatLogs] = useState([]);

  const currentUser = UserStore.redditProfile.subreddit.title;

  useEffect(() => {
    setChatLogs([...data]);
  }, [data]);

  const chats = chatLogs
    .sort((a, b) => {
      return a.created_utc - b.created_utc;
    })
    .map((x, id) => {
      const isCurrent =
        x.author === currentUser.replace(/\s/g, "") ? true : false;

      return (
        <li key={id} className="chat">
          <h4 className={`chat-author ${isCurrent ? "chat-right" : ""}`}>
            {isCurrent ? "You" : x.author}
          </h4>
          <div className={`chat-body-wrapper  ${isCurrent ? "right" : ""}`}>
            <p
              className={`chat-body ${
                isCurrent ? "chat-body-light" : "chat-body-dark"
              }`}
            >
              {x.body}
            </p>
          </div>
          <div
            className={`flex items-center chat-footer ${
              isCurrent ? "right" : ""
            }`}
          >
            <p className={`chat-date ${isCurrent ? "chat-right" : ""}`}>
              {dateFns.format(
                moment.unix(x.created_utc)._d,
                "MMM DD, YYYY h:mm:ss aa"
              )}
            </p>
          </div>
        </li>
      );
    });

  return (
    <div className="chat-bubble ">
      <ul>{chats}</ul>
      <SendChatForm
        user={chatLogs[0]}
        sentMsg={(v) => {
          setChatLogs([...chatLogs, v]);
        }}
      />
    </div>
  );
};

export default InboxChat;
