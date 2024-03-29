import React from "react";
import HR from "../HR/HR";
import Uploader from "../Uploader/Uploader";
import { MinimalButton } from "../Buttons/Buttons";
import { H2, H2Subtitle } from "../Headings/Headings";

const SiteBuilderForm = ({
  config,
  configHandler,
  pondRef,
  deleteImageHandler,
}) => {
  return (
    <form className="form ">
      <div className="field-group subdomain-wrapper">
        <label htmlFor="subdomain" className="form-label">
          Subdomain
        </label>
        <div className="flex items-center multi-input">
          <span className="preffix">https://</span>
          <input
            type="text"
            className="form-input has-preffix has-suffix flex-1"
            name="subdomain"
            value={config.subdomain}
            onChange={(e) => configHandler(e)}
          />
          <span className="suffix">
            .{process.env.REACT_APP_SUBDOMAIN_HOST}
          </span>
        </div>
        {config.subdomain && (
          <p className="subtle mt-2">
            https://{config.subdomain.trim().replace(/\W/g, "-").toLowerCase()}.
            {process.env.REACT_APP_SUBDOMAIN_HOST}
          </p>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="title" className="form-label">
          Site Title
        </label>
        <div className="flex items-center multi-input">
          <span className="preffix">
            <i className="fas fa-id-badge"></i>
          </span>
          <input
            type="text"
            className="form-input has-preffix flex-1"
            name="title"
            value={config.title}
            placeholder="My Awesome Site"
            onChange={(e) => configHandler(e)}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="title" className="form-label">
          Site Introduction
        </label>
        <textarea
          type="text"
          className="textarea"
          name="introduction"
          value={config.introduction}
          placeholder="A blurb about you or your site"
          onChange={(e) => {
            const charCount = document.querySelector("#introCharCount");
            charCount.innerHTML = `${e.target.value.length}/1000`;

            configHandler(e);

            if (e.target.value.length <= 1000) {
              charCount.style.color = "hsla(211, 12%, 48%,1)";
            } else {
              charCount.style.color = "red";
            }
          }}
        />
        <p id="introCharCount"></p>
      </div>

      <div className="field-group">
        <label className="form-label">Banner Image</label>
        {!config.banner_url && (
          <>
            <p className="subtle mb-2">
              * upload image at 1500px (width) x 500px (height) for best
              results.
            </p>
            <Uploader pondRef={pondRef} />
          </>
        )}

        {config.banner_url && (
          <>
            <img
              src={config.banner_url}
              style={{
                objectFit: "contain",
                width: "100%",
              }}
              alt="Website banner"
            />
            <div className="flex justify-center mt-2">
              <MinimalButton onClick={deleteImageHandler}>
                Remove Cover Photo
              </MinimalButton>
            </div>
          </>
        )}
      </div>

      <HR classes="mt-6 mb-6" />

      <H2>Social Media</H2>
      <H2Subtitle>
        The links below will appear as social icons on your site. These are not
        required, and the icons will not appear on your site if you leave them
        blank.
      </H2Subtitle>

      <div className="field-group mt-2">
        <label htmlFor="twitter" className="form-label">
          Twitter
        </label>
        <div className="flex items-center multi-input">
          <span className="preffix">@</span>
          <input
            type="text"
            className="form-input has-preffix flex-1"
            name="twitter"
            value={config.twitter}
            placeholder="@twitter_handle"
            onChange={(e) => configHandler(e)}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="instagram" className="form-label">
          Instagram
        </label>
        <div className="flex items-center multi-input">
          <span className="preffix">@</span>
          <input
            type="text"
            className="form-input has-preffix flex-1"
            name="instagram"
            value={config.instagram}
            placeholder="Instagram username"
            onChange={(e) => configHandler(e)}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="facebook" className="form-label">
          Facebook Link
        </label>
        <div className="flex items-center multi-input">
          <span className="preffix">
            <i className="fab fa-facebook-f"></i>
          </span>
          <input
            type="text"
            className="form-input has-preffix flex-1"
            name="facebook"
            value={config.facebook}
            placeholder="https://facebook.com/mypage"
            onChange={(e) => configHandler(e)}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="patreon" className="form-label">
          Patreon Link
        </label>
        <div className="flex items-center multi-input">
          <span className="preffix">
            <i className="fab fa-patreon"></i>
          </span>
          <input
            type="text"
            className="form-input has-preffix flex-1"
            name="patreon"
            value={config.patreon}
            placeholder="https://patreon.com/mypage"
            onChange={(e) => configHandler(e)}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="youtube" className="form-label">
          Youtube Channel Link
        </label>
        <div className="flex items-center multi-input">
          <span className="preffix">
            <i className="fab fa-youtube"></i>
          </span>
          <input
            type="text"
            className="form-input has-preffix flex-1"
            name="youtube"
            value={config.youtube}
            placeholder="https://youtube.com/c/channelId"
            onChange={(e) => configHandler(e)}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="podcast" className="form-label">
          Podcast Link
        </label>
        <div className="flex items-center multi-input">
          <span className="preffix">
            <i className="fas fa-podcast"></i>
          </span>
          <input
            type="text"
            className="form-input has-preffix flex-1"
            name="podcast"
            value={config.podcast}
            placeholder="Link to your podcast"
            onChange={(e) => configHandler(e)}
          />
        </div>
      </div>
    </form>
  );
};

export default SiteBuilderForm;
