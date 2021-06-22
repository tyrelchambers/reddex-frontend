import React from "react";
import { toast } from "react-toastify";
import { MainButton } from "../../../../components/Buttons/Buttons";
import { H2, H2Subtitle } from "../../../../components/Headings/Headings";
import { saveAltMessage } from "../../../../api/saveAltMessage";
const AltMessage = ({ UserStore, repeatGreeting, setRepeatGreeting }) => {
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
      await saveAltMessage(repeatGreeting);
      toast.success("Greeting saved");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="default-message animated fadeIn faster bg">
      <H2>Recurring Message</H2>
      <H2Subtitle>
        This is used when you've already messaged an author. It's useful so
        users don't feel like they're just getting copy and pasted messages.
      </H2Subtitle>

      <form className="d-f fxd-c ai-fs mt+">
        <div className="field-group">
          <label htmlFor="defaultMessage" className="form-label">
            Your Recurring Message
          </label>
          <textarea
            name="defaultMessage"
            className="textarea"
            id="defaultMessage"
            placeholder="Enter default message.."
            value={repeatGreeting || ""}
            onChange={(e) => setRepeatGreeting(e.target.value)}
          ></textarea>
        </div>

        <div className="d-f jc-sb ai-c w-100pr account-footer">
          <Username />

          <MainButton
            className="btn btn-green p-"
            onClick={(e) => saveMessageHandler(e)}
            value="Save Message"
          />
        </div>
      </form>
    </section>
  );
};

export default AltMessage;
