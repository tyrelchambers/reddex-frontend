import React from "react";
import dateFns from "date-fns";
import moment from "moment";
import "./UserInbox.css";
import isEmpty from "../../helpers/objIsEmpty";

const UserInboxDumb = ({ data, onClick, UserStore, InboxStore }) => {
  const currentUser = UserStore.redditProfile.name;
  const getLastReply = (x) => {
    let date;
    if (isEmpty(x.data.replies)) {
      date = dateFns.format(moment.unix(x.data.created_utc)._d, "MMM DD");
    } else {
      date = dateFns.format(
        moment.unix(
          x.data.replies.data.children[x.data.replies.data.children.length - 1]
            .data.created_utc
        )._d,
        "MMM DD"
      );
    }

    return date;
  };
  const listItem =
    data.length > 0 ? (
      data.map((x) => {
        const formatThreads = () => {
          let lastReply;

          if (x.data.replies.length === 0) {
            lastReply = x.data;
          } else {
            lastReply =
              x.data.replies.data.children[
                x.data.replies.data.children.length - 1
              ].data;
          }

          return lastReply.author === currentUser.replace(/\s/g, "")
            ? `You: ${lastReply.body}`
            : lastReply.body;
        };

        const selectHandler = (msg) => {
          return InboxStore.setSelectedMessage(msg);
        };

        return (
          <li
            key={x.data.id}
            className="inbox-item flex flex-col cell-row"
            name={x.data.name}
            onClick={(e) => {
              selectHandler(x.data);
              onClick(x.data);
            }}
          >
            <div className="flex justify-between">
              <p className="font-bold text-gray-600">
                {x.data.author === currentUser.replace(/\s/g, "")
                  ? x.data.dest
                  : x.data.author}
              </p>
              <p className="text-right">{getLastReply(x)}</p>
            </div>
            <p className="font-bold truncate w-full text-xl">
              {x.data.subject}
            </p>

            <div className="inbox-item-body">
              <i className="fas fa-comment-alt mr-2"></i>
              <p className=" message-snippet">{formatThreads()}</p>
            </div>
          </li>
        );
      })
    ) : (
      <p className="mt-6">No results found!</p>
    );

  return <ul className="mt-2">{listItem}</ul>;
};

export default UserInboxDumb;
