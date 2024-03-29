import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard";
import UserInbox from "../../../components/UserInbox/UserInbox";
import { inject, observer } from "mobx-react";
import { fetchTokens } from "../../../helpers/renewRefreshToken";
import Axios from "axios";
import "./Inbox.css";
import { checkValidTokens } from "../../../helpers/checkValidTokens";
import WithNav from "../../../layouts/WithNav/WithNav";
import { H1, H1Subtitle } from "../../../components/Headings/Headings";

const Inbox = inject("InboxStore")(
  observer(({ InboxStore }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (InboxStore.messages.length === 0) {
        getInbox(InboxStore, setLoading);
      } else {
        setLoading(false);
      }
    }, []);

    return (
      <Dashboard>
        <H1>Inbox</H1>
        <H1Subtitle>Your Reddit-connected inbox.</H1Subtitle>
        <WithNav>
          {InboxStore.openChatWindow && <Breadcrumbs store={InboxStore} />}
          <UserInbox loading={loading} InboxStore={InboxStore} />
        </WithNav>
      </Dashboard>
    );
  })
);

const Breadcrumbs = ({ store }) => {
  return (
    <div className="breadcrumb ">
      <p
        className="flex items-center"
        onClick={() => store.setOpenChatWindow(false)}
      >
        <i className="fas fa-chevron-left mr-2"></i>
        Close
      </p>
    </div>
  );
};

const getInbox = async (InboxStore, setLoading) => {
  await checkValidTokens();
  const token = await fetchTokens();
  Axios.get(`https://oauth.reddit.com/message/messages`, {
    headers: {
      Authorization: `bearer ${token.access_token}`,
    },
  })
    .then((res) => {
      InboxStore.setMessages({
        data: res.data.data.children,
        after: res.data.data.after,
      });
      setLoading(false);
    })
    .catch(console.log);
};

export default Inbox;
