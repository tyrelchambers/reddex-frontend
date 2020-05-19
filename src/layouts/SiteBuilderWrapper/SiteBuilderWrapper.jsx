import React from 'react';
import { inject, observer } from 'mobx-react';
import SiteSaveStatus from '../SiteSaveStatus/SiteSaveStatus';

const SiteBuilderWrapper = ({SiteStore, FormStore, children}) => {

  const submitHandler = async () => {
    SiteStore.setSaving(true)
    await SiteStore.submit();
    await FormStore.save(SiteStore.config.uuid, FormStore.options_id)
    SiteStore.setSaving(false)

  }

  return (
    <>
      <SiteSaveStatus
        config={SiteStore.config}
        store={SiteStore}
        submitHandler={submitHandler}
        saving={SiteStore.saving}
      />
      {children}
    </>
  );
}

export default inject("SiteStore", "FormStore")(observer(SiteBuilderWrapper));
