import React from 'react'
import './SiteSaveStatus.scss'
import { MainButton } from '../../components/Buttons/Buttons';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import _ from 'lodash'

const SiteSaveStatus = inject("SiteStore")(observer(({submitHandler, SiteStore, saving}) => {
  if ( SiteStore.changes ) {
    console.log(SiteStore.changes)
    return (
      <div className="site-save-status mt+ mb+ d-f ai-c jc-sb animated fadeIn faster">
        <p>You have unsaved changes</p>

        <div className="site-save-actions">
          <MainButton
            className="btn btn-primary"
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
}));

export default SiteSaveStatus;
