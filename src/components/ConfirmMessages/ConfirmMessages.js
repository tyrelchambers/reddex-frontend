import React, { useState, useEffect } from "react";
import "./ConfirmMessages.scss";
import { MainButton } from "../Buttons/Buttons";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { fetchTokens } from "../../helpers/renewRefreshToken";
import { checkValidTokens } from "../../helpers/checkValidTokens";
import { saveAuthorToDb } from "../../api/saveAuthorToDb";
import { saveStoryToUser } from "../../api/saveStoryToUser";
import { useContact } from "../../hooks/useContact";
import { formattedSubject } from "../../helpers/formattedSubject";
import { useMessagedUsers } from "../../hooks/useMessagedUsers";
import { sendMessageToAuthor } from "../../api/sendMessageToAuthor";

const ConfirmMessages = inject(
  "UserStore",
  "ModalStore",
  "PostStore"
)(
  observer(({ removeMessagedAuthor, UserStore, PostStore, ModalStore }) => {
    const [defaultMessage, setDefaultMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [expandContact, setExpandContact] = useState(false);
    const { contact, fetchContact } = useContact();
    const { messagedUsers, getMessagedUsers } = useMessagedUsers();

    useEffect(() => {
      const fn = async () => {
        if (PostStore.selectedPost) {
          await fetchContact(PostStore.selectedPost.author);
        }
        await getMessagedUsers();
      };

      fn();
    }, [PostStore.selectedPost]);

    useEffect(() => {
      const authorExists = messagedUsers.filter(
        (x) => x.name === PostStore.selectedPost.author
      );
      if (authorExists.length > 0) {
        setDefaultMessage(UserStore.currentUser.repeat_message);
      } else {
        setDefaultMessage(UserStore.currentUser.initial_message);
      }
    }, [messagedUsers]);

    if (!PostStore.selectedPost) return null;

    const sendMessageToAuthors = async () => {
      const { author, post_id } = PostStore.selectedPost;
      await checkValidTokens();
      const tokens = await fetchTokens().catch((err) => false);
      const fmtSubject = formattedSubject(PostStore.selectedPost.title);
      const link = `https://oauth.reddit.com/api/compose`;

      if (!tokens || !author) return toast.error("Something went wrong");
      if (!defaultMessage) return toast.error("A messaged is needed to send");

      const body = new FormData();
      body.set("to", `/u/${author}`);
      body.set("subject", fmtSubject);
      body.set("text", defaultMessage);

      await sendMessageToAuthor({
        link,
        access_token: tokens.access_token,
        body,
      });

      const newPostId = await saveStoryToUser(PostStore.selectedPost);
      saveAuthorToDb(author, newPostId.uuid);

      PostStore.removePostFromQueue(post_id);

      PostStore.selectedPosts.length > 0
        ? PostStore.setSelectedPost(PostStore.selectedPosts[0])
        : ModalStore.setIsOpen(false);

      setLoading(false);
    };

    return (
      <div className="confirm-messages-wrapper p-4">
        <div className="flex justify-between items-center">
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
        </div>
        {contact && expandContact && (
          <div className="modal-contact-details-wrapper mt-">
            <p>{contact.notes}</p>
          </div>
        )}
        <div className="flex flex-col mt-2 justify-around gap-6">
          <div className="mb-6">
            <p className="font-bold">Subject</p>
            <p>{formattedSubject(PostStore.selectedPost.title)}</p>
          </div>

          <div className="field-group">
            <div className="flex items-center gap-4 message-body-header">
              <p className="font-bold">Message To Send</p>
              <div className="flex gap-4">
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

          <div className="d-f jc-sb ai-c confirm-actions">
            <i
              className="fas fa-trash text-red-500"
              onClick={() => removeMessagedAuthor()}
            ></i>

            <MainButton
              className="btn btn-primary"
              onClick={() => {
                setLoading(true);
                sendMessageToAuthors();
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
