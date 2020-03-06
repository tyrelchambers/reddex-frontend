import React, { useState } from 'react'
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import './Uploader.scss'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
registerPlugin(FilePondPluginFileValidateSize);
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Uploader = inject("SiteStore")(observer(({pondRef, SiteStore}) => {
  const [_file, _setFile] = useState([]);
  const token = window.localStorage.getItem("token");

  return (
    <div>
      <FilePond
          ref={ref => (pondRef.current = ref)}
          allowMultiple={false}
          maxFiles={1}
          maxFileSize="3MB"       
          instantUpload={false}
          allowRevert={false}
          server={{
            url: `${process.env.REACT_APP_BACKEND}/api/upload`,
            process: {
              url: '/save',
              method: 'POST',
              headers: {
                token
              }
            },
            revert: null,
            restore: null,
            load: null,
            fetch: null

          }}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            SiteStore.setChanges(true);
            _setFile({file: fileItems.map(fileItem => fileItem.file)});
          }}
        />
    </div>
  )
}));

export default Uploader