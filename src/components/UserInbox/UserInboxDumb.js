import React from "react";
import dateFns from "date-fns";
import moment from "moment";
import "./UserInbox.scss";
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
            className="inbox-item d-f fxd-c cell-row"
            name={x.data.name}
            onClick={(e) => {
              selectHandler(x.data);
              onClick(x.data);
            }}
          >
            <div className="grid grid-cols-3 gap-3">
              <p className="font-bold">
                {x.data.author === currentUser.replace(/\s/g, "")
                  ? x.data.dest
                  : x.data.author}
              </p>
              <p className="ellipses">{x.data.subject}</p>
              <p className="ta-r">{getLastReply(x)}</p>
            </div>
            <div className="inbox-item-body">
              <i className="fas fa-comment-alt mr-"></i>
              <p className=" message-snippet">{formatThreads()}</p>
            </div>
          </li>
        );
      })
    ) : (
      <p className="mt+">No results found!</p>
    );

  return <ul className="mt-">{listItem}</ul>;
};

export default UserInboxDumb;
