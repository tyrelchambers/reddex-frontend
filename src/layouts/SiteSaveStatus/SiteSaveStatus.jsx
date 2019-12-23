import React, { useState, useEffect } from 'react'
import './SiteSaveStatus.scss'
import { MainButton } from '../../components/Buttons/Buttons';

const SiteSaveStatus = ({config, store}) => {
  const [same, setSame] = useState(true);

  useEffect(() => {
    const preview = JSON.stringify(store.preview);
    const configObj = JSON.stringify(config);

    if ( preview === configObj ) {
      setSame(true)
    } else {
      setSame(false)
    }
  }, [config]);

  if ( !same ) {
    return (
      <div className="site-save-status mt+ mb+ d-f ai-c jc-sb animated fadeIn faster">
        <p>You have unsaved changes</p>

        <div className="site-save-actions">
          <MainButton
            className="btn btn-primary"
            value="Save"
          />

        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default SiteSaveStatus;
