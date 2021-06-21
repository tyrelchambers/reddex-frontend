import React, { useEffect, useState } from "react";
import Axios from "axios";
import { fetchTokens } from "../../helpers/renewRefreshToken";
import UserInboxDumb from "./UserInboxDumb";
import { inject, observer } from "mobx-react";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";
import { MainButton } from "../Buttons/Buttons";
import HR from "../HR/HR";
const UserInbox = inject(
  "InboxStore",
  "UserStore"
)(
  observer(({ InboxStore, loading, UserStore }) => {
    const [messages, setMessages] = useState([]);
    const [sortVal, setSortVal] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const history = useHistory();

    useEffect(() => {
      const _ = async () => {
        const msgs = await InboxStore.getMessages();
        setMessages([...msgs]);
      };
      _();
    }, [InboxStore.messages]);

    useEffect(() => {
      if (sortVal) {
        const sort = sortInbox(InboxStore.getMessages(), sortVal, UserStore);
        setMessages(sort);
      } else {
        setMessages(InboxStore.getMessages());
      }
    }, [sortVal]);

    if (loading) return <Loading title="Fetching inbox from Reddit" />;

    return (
      <div className="inbox-wrapper">
        <div className="d-f jc-sb bg shadow-md">
          <input
            type="text"
            className="search-large w- max-w-xl w-100pr "
            placeholder="Search inbox by username..."
            onChange={(e) => setSortVal(e.target.value.toLowerCase())}
          />
          <div className="h-48px get-more-button">
            <MainButton
              loading={loadingBtn}
              className="btn btn-primary w-100pr"
              onClick={() => {
                setLoadingBtn(true);
                getMoreMessages(InboxStore, setLoadingBtn);
              }}
            >
              Get More Messages
            </MainButton>
          </div>
        </div>
        <HR />
        <div className="bg mt-4 shadow-md">
          <div className="grid grid-cols-3  gap-3">
            <p className="font-bold text-lg">From</p>
            <p className="font-bold text-lg">Subject</p>
            <p className="font-bold text-lg ta-r">Sent/Received</p>
          </div>

          <UserInboxDumb
            data={messages}
            onClick={(v) => {
              history.push(`/dashboard/message/${v.id}`);
            }}
            selected={InboxStore.getSelectedMessage()}
            loadingBtn={loadingBtn}
            UserStore={UserStore}
            InboxStore={InboxStore}
          />
        </div>
      </div>
    );
  })
);

const getMoreMessages = async (InboxStore, setLoadingBtn) => {
  const token = await fetchTokens();
  const after = InboxStore.latestAfter;

  Axios.get(
    `https://oauth.reddit.com/message/messages?after=${after}&count=25`,
    {
      headers: {
        Authorization: `bearer ${token.access_token}`,
      },
    }
  )
    .then((res) => {
      res.data.data.children.shift();
      InboxStore.setMessages({
        data: res.data.data.children,
        after: res.data.data.after,
      });
      setLoadingBtn(false);
    })
    .catch(console.log);
};

const sortInbox = (data, sortVal, UserStore) => {
  const currentUser = UserStore.redditProfile.name;

  return data.filter((x) => {
    const isCurrent =
      x.data.author === currentUser.replace(/\s/g, "") ? true : false;
    const dest = x.data.dest.toLowerCase();
    const author = x.data.author.toLowerCase();

    return isCurrent ? dest.includes(sortVal) : author.includes(sortVal);
  });
};

export default UserInbox;
