import React, { useState, useEffect } from "react";
import "./ConfirmMessages.scss";
import { MainButton, MinimalButton } from "../Buttons/Buttons";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { getAxios } from "../../api";
import Axios from "axios";
import { toast } from "react-toastify";
import { fetchTokens } from "../../helpers/renewRefreshToken";
import { checkValidTokens } from "../../helpers/checkValidTokens";
import PostStore from "../../stores/PostStore";
import { Tag } from "../Forms/AddTagForm";
import { saveAuthorToDb } from "../../api/saveAuthorToDb";
import { saveStoryToUser } from "../../api/saveStoryToUser";
import { saveTags } from "../../api/saveTags";
import { useContacts } from "../../hooks/useContacts";
import { formattedSubject } from "../../helpers/formattedSubject";

const ConfirmMessages = inject(
  "UserStore",
  "ModalStore"
)(
  observer(({ data, removeMessagedAuthor, UserStore }) => {
    const [defaultMessage, setDefaultMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [expandContact, setExpandContact] = useState(false);
    const [authorsMessaged, setAuthorsMessaged] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [toAdd, setToAdd] = useState([]);
    const { contacts, fetchContact } = useContacts();

    useEffect(() => {
      const fn = async () => {
        await fetchContact(data.author);

        const authors = await getAxios({
          url: "/profile/authors_messaged",
        });

        await getAxios({
          url: "/tags/",
        }).then((res) => {
          if (res) {
            setAvailableTags([...res]);
          }
        });

        setAuthorsMessaged([...authors]);
      };

      fn();

      return () => {
        setExpandContact(false);
      };
    }, [data]);

    useEffect(() => {
      messageHandler();
    }, [data, authorsMessaged]);

    const messageHandler = () => {
      const authorExists = authorsMessaged.filter(
        (x) => x.name === data.author
      );
      if (authorExists.length > 0) {
        setDefaultMessage(UserStore.currentUser.repeat_message);
      } else {
        setDefaultMessage(UserStore.currentUser.initial_message);
      }
    };

    const sendMessageToAuthors = async (
      author,
      subject,
      message,
      removeMessagedAuthor,
      setLoading,
      post_id,
      data
    ) => {
      await checkValidTokens();
      const tokens = await fetchTokens().catch((err) => false);
      const fmtSubject = subject;
      const link = `https://oauth.reddit.com/api/compose`;

      if (!tokens || !author) return toast.error("Something went wrong");
      if (!message) return toast.error("A messaged is needed to send");
      if (!fmtSubject) return toast.error("A subject is needed");

      if (fmtSubject.length > 80)
        return toast.error("Subject line is too long");
      const body = new FormData();
      body.set("to", `/u/${author}`);
      body.set("subject", fmtSubject);
      body.set("text", message);
      // await Axios.post(link, body, {
      //   headers: {
      //     Authorization: `bearer ${tokens.access_token}`,
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      // })
      //   .then((res) => {
      //     removeMessagedAuthor();
      //     saveAuthorToDb(author, post_id);
      //     saveStoryToUserHandler(data);
      //     setLoading(false);
      //     PostStore.clearSelectedPosts();
      //   })
      //   .catch((err) => {
      //     if (err) {
      //       toast.error("Something went wrong");
      //     }
      //   });
    };

    const saveStoryToUserHandler = async (data) => {
      const uuid = await saveStoryToUser(data);
      if (uuid) {
        saveTags({ story_uuid: uuid, tagsToAdd: toAdd });
      }
    };

    return (
      <div className="confirm-messages-wrapper">
        <h1
          className="confirm-title"
          id="author"
          data-author={data.author}
          onClick={() => setExpandContact(!expandContact)}
        >
          To: {data.author}
          {contacts && (
            <span className="modal-contact-toggle ml-">
              <i className="fas fa-address-book mr-"></i>
              <p className="tt-u">Expand</p>
            </span>
          )}
        </h1>
        {contacts && expandContact && (
          <div className="modal-contact-details-wrapper mt-">
            <p>{contacts.notes}</p>
          </div>
        )}
        <div className="d-f fxd-c mt-">
          <div className="field-group">
            <div className="d-f jc-sb">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
            </div>
            <p className="subject">{formattedSubject(data.title)}</p>
          </div>

          <div className="d-f mt- mb- prefill-wrapper">
            <button
              className=" btn btn-green p- m--"
              onClick={() =>
                setDefaultMessage(UserStore.getUser().initial_message)
              }
            >
              {" "}
              Prefill Greeting Message{" "}
            </button>

            <button
              className=" btn btn-green p- m--"
              onClick={() =>
                setDefaultMessage(UserStore.getUser().repeat_message)
              }
            >
              {" "}
              Prefill Recurring Message{" "}
            </button>
          </div>

          <div className="field-group">
            <label htmlFor="defaultMessage" className="form-label">
              Message To Send
            </label>
            <textarea
              name="defaultMessage"
              className="default-message-input"
              id="defaultMessage"
              placeholder="Enter default message.."
              value={defaultMessage}
              onChange={(e) => setDefaultMessage(e.target.value)}
            ></textarea>
          </div>

          <h3 className="font-bold">Add tags</h3>
          <div className="d-f fxw-w">
            {availableTags.map((x, id) => (
              <Tag key={id} x={x} id={id} toAdd={toAdd} setToAdd={setToAdd} />
            ))}
          </div>
          <div className="d-f jc-sb ai-c confirm-actions mt+">
            <MinimalButton
              onClick={() => removeMessagedAuthor()}
              classNames="danger-text"
            >
              Remove from queue
            </MinimalButton>
            <MainButton
              className="btn btn-primary"
              onClick={() => {
                setLoading(true);
                sendMessageToAuthors(
                  data.author,
                  formattedSubject(data.title),
                  defaultMessage,
                  removeMessagedAuthor,
                  setLoading,
                  data.post_id,
                  data
                );
              }}
              value="Message Author"
              loading={loading}
            />
          </div>
        </div>
      </div>
    );
  })
);

export default ConfirmMessages;
