import React from "react";
import { toast } from "react-toastify";
import { saveDefaultMessage } from "../../../../api/saveDefaultMessage";
import { MainButton } from "../../../../components/Buttons/Buttons";
import { H2Subtitle, H2 } from "../../../../components/Headings/Headings";

const Home = ({ UserStore, setInitialGreeting, initialGreeting }) => {
  const Username = () =>
    UserStore.getRedditProfile() ? (
      <p>
        From:{" "}
        <span className="highlight-text">
          {UserStore.getRedditProfile().name}
        </span>
      </p>
    ) : null;

  const saveMessageHandler = async (e) => {
    e.preventDefault();
    try {
      await saveDefaultMessage(initialGreeting);
      toast.success("Greeting saved");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="default-message animated fadeIn faster bg">
      <H2>Greeting Message</H2>
      <H2Subtitle>
        This message is used when you haven't messaged an author before. Think
        of it as an initial greeting. Say hello, introduce yourself, go from
        there.
      </H2Subtitle>

      <form className="d-f fxd-c ai-fs mt+">
        <div className="field-group">
          <label htmlFor="defaultMessage" className="form-label">
            Your Greeting Message
          </label>
          <textarea
            name="defaultMessage"
            className="textarea"
            id="defaultMessage"
            placeholder="Enter default message.."
            value={initialGreeting || ""}
            onChange={(e) => setInitialGreeting(e.target.value)}
          ></textarea>
        </div>

        <div className="d-f jc-sb ai-c w-100pr account-footer">
          <Username />

          <MainButton
            className="btn btn-primary"
            onClick={(e) => saveMessageHandler(e)}
            value="Save Message"
          />
        </div>
      </form>
    </section>
  );
};

export default Home;
