import React from "react";
import "./SiteSaveStatus.css";
import { MainButton } from "../../components/Buttons/Buttons";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

const SiteSaveStatus = inject(
  "SiteStore",
  "FormStore"
)(
  observer(({ submitHandler, SiteStore, FormStore, saving }) => {
    if (SiteStore.changes || FormStore.changes) {
      return (
        <div className="site-save-status mt-6 mb-6 flex items-center justify-between">
          <p>You have unsaved changes</p>

          <div className="site-save-actions flex items-center">
            <button
              className="btn mr-6"
              onClick={() => window.location.reload()}
            >
              Discard
            </button>
            <MainButton
              className="btn btn-yellow"
              value="Save"
              onClick={submitHandler}
              loading={saving}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  })
);

export default SiteSaveStatus;
