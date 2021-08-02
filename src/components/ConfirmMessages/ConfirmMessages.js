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
import { useContact } from "../../hooks/useContact";
import { formattedSubject } from "../../helpers/formattedSubject";
import { getMessagedAuthors } from "../../api/getMessagedAuthors";
import { useMessagedUsers } from "../../hooks/useMessagedUsers";
import { useSelectedItem } from "../../hooks/useSelectedItem";

const ConfirmMessages = inject(
  "UserStore",
  "ModalStore",
  "PostStore"
)(
  observer(({ removeMessagedAuthor, UserStore, PostStore }) => {
    const [defaultMessage, setDefaultMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [expandContact, setExpandContact] = useState(false);
    const [authorsMessaged, setAuthorsMessaged] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [toAdd, setToAdd] = useState([]);
    const { contact, fetchContact } = useContact();
    const { messagedUsers, getMessagedUsers } = useMessagedUsers();

    // useEffect(() => {
    //   const fn = async () => {
    //     await fetchContact(selectedPost.author);
    //     await getMessagedUsers();

    //     await getAxios({
    //       url: "/tags/",
    //     }).then((res) => {
    //       if (res) {
    //         setAvailableTags([...res]);
    //       }
    //     });
    //   };

    //   fn();

    //   return () => {
    //     setExpandContact(false);
    //   };
    // }, [selectedPost]);

    // useEffect(() => {
    //   messageHandler();
    // }, [selectedPost, authorsMessaged]);

    if (!PostStore.selectedPost) return null;

    const messageHandler = () => {
      const authorExists = messagedUsers.filter(
        (x) => x.name === PostStore.selectedPost.author
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
      <div className="confirm-messages-wrapper p-4">
        <p
          className="font-black text-3xl"
          id="author"
          data-author={PostStore.selectedPost.author}
          onClick={() => setExpandContact(!expandContact)}
        >
          To: {PostStore.selectedPost.author}
          {contact && (
            <span className="modal-contact-toggle ml-">
              <i className="fas fa-address-book mr-"></i>
              <p className="tt-u">Expand</p>
            </span>
          )}
        </p>
        {contact && expandContact && (
          <div className="modal-contact-details-wrapper mt-">
            <p>{contact.notes}</p>
          </div>
        )}
        <div className="d-f fxd-c mt-">
          <div className="mb-6">
            <p className="font-bold">Subject</p>
            <p>{formattedSubject(PostStore.selectedPost.title)}</p>
          </div>

          <div className="field-group">
            <div className="flex items-center gap-4">
              <p className="font-bold">Message To Send</p>
              <p
                className="px-4 text-sm rounded-full border-2 border-gray-400 cursor-pointer"
                onClick={() =>
                  setDefaultMessage(UserStore.getUser().initial_message)
                }
              >
                Initial
              </p>
              <p
                className="px-4 text-sm rounded-full border-2 border-gray-400 cursor-pointer"
                onClick={() =>
                  setDefaultMessage(UserStore.getUser().repeat_message)
                }
              >
                Recurring
              </p>
            </div>
            <textarea
              name="defaultMessage"
              className="default-message-input mt-2"
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
            <i
              class="fas fa-trash text-red-500"
              onClick={() => removeMessagedAuthor()}
            ></i>

            <MainButton
              className="btn btn-primary"
              onClick={() => {
                setLoading(true);
                sendMessageToAuthors(
                  PostStore.selectedPost.author,
                  formattedSubject(PostStore.selectedPost.title),
                  defaultMessage,
                  removeMessagedAuthor,
                  setLoading,
                  PostStore.selectedPost.post_id,
                  PostStore.selectedPost
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
