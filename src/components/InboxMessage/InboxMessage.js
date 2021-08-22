import React, { useState, useEffect } from "react";
import "./InboxMessage.css";
import isEmpty from "../../helpers/objIsEmpty";
import HR from "../HR/HR";
import InboxChat from "../InboxChat/InboxChat";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { getAxios } from "../../api";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import WithNav from "../../layouts/WithNav/WithNav";
import tabs from "./tabs";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { checkValidTokens } from "../../helpers/checkValidTokens";
import { fetchTokens } from "../../helpers/renewRefreshToken";
import { H2, H1 } from "../Headings/Headings";
import Loading from "../Loading/Loading";
import { addToContacts } from "../../api/AddToContacts";
import { getStoryFromRedditInbox } from "../../api/getStoryFromRedditInbox";
import { permissionHandler } from "../../api/permissionHandler";

const InboxMessage = inject(
  "UserStore",
  "ReadingListStore"
)(
  observer(({ UserStore, ReadingListStore }) => {
    const [storyLink, setStoryLink] = useState("");
    const [data, setData] = useState();
    const [contacts, setContacts] = useState([]);
    const [isContact, setIsContact] = useState(false);
    const { message } = useParams();

    useEffect(() => {
      const fn = async () => {
        await checkValidTokens();
        const token = await fetchTokens();
        await Axios.get(
          `https://oauth.reddit.com/message/messages/${message}`,
          {
            headers: {
              Authorization: `bearer ${token.access_token}`,
            },
          }
        ).then((res) => {
          setData(res.data.data.children[0].data);
          getStory(res.data.data.children[0].data, setStoryLink);
        });

        const c = await getAxios({
          url: "/contacts/all",
        });
        setContacts([...c]);
      };

      fn();
    }, []);

    const msgArr = [];

    if (data && !isEmpty(data.replies)) {
      data.replies.data.children.forEach((x) => {
        msgArr.push(x.data);
      });
    }

    msgArr.push(data);

    const IsInReadingList = () => {
      if (!storyLink) return null;

      let isListed = ReadingListStore.toRead.filter((x, id) =>
        x.title.replace("...", "").includes(data.subject.replace("...", ""))
      );

      if (isListed.length > 0) {
        return (
          <button className="chat-action items-center no-action" disabled>
            <i className="fas fa-bookmark mr-2"></i>
            In reading list
          </button>
        );
      } else {
        return (
          <button
            className="chat-action items-center"
            onClick={() => {
              permissionHandler(true, data);
              toast.success("Added to reading list");
            }}
          >
            <i className="fas fa-bookmark mr-2"></i>
            Add to reading List
          </button>
        );
      }
    };

    const IsInContacts = () => {
      const contact = contacts.filter((x, id) => x.name === data.dest);

      if (contact.length === 1 || isContact) {
        return (
          <button className="chat-action items-center no-action" disabled>
            <i className="fas fa-address-book mr-2"></i>
            Already a contact
          </button>
        );
      } else {
        return (
          <button
            className="chat-action  items-center"
            onClick={() => {
              addToContacts(data);
              setIsContact(true);
              toast.success("Contact saved");
            }}
          >
            <i className="fas fa-address-book mr-2"></i>
            Add to contacts
          </button>
        );
      }
    };

    return (
      <Dashboard>
        <H1>Inbox Message</H1>
        <WithNav tabs={tabs}>
          {!isEmpty(data) && (
            <div className="inbox-message-wrapper flex-1 p-4 rounded-lg shadow-md">
              <main>
                <div className="flex flex-col inbox-message-header">
                  <H2>
                    <a
                      href={storyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.subject}
                    </a>
                  </H2>
                  <p className="mb-2 message-subtitle mt-2">
                    From:{" "}
                    <a
                      href={`https://reddit.com/u/${
                        destIsMe(data, UserStore.redditProfile)
                          ? data.author
                          : data.dest
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {destIsMe(data, UserStore.redditProfile)
                        ? data.author
                        : data.dest}
                    </a>{" "}
                  </p>
                  <div className="message-tags mb-2">
                    <IsInReadingList />
                    <IsInContacts />
                  </div>

                  <HR />
                </div>
                <InboxChat data={msgArr} UserStore={UserStore} />
              </main>
            </div>
          )}
          {isEmpty(data) && <Loading title="Fetching message from Reddit" />}
        </WithNav>
      </Dashboard>
    );
  })
);

const getStory = async (data, setStoryLink) => {
  const story = await getStoryFromRedditInbox(data);
  setStoryLink(story.url);
};

export const destIsMe = (data, currentUser) => {
  return data.dest === currentUser.name.replace(/\s/g, "");
};

export default InboxMessage;
