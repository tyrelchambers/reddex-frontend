import React, {useState, useRef} from 'react'
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import './FileUpload.scss'
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Axios from 'axios';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation, 
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

export const FileUpload = ({maxFiles, allowMultiple, token, files}) => {
 const ref = useRef();

  // const deleteExistingFiles = (uniqueId) => {
  //   Axios.delete(process.env.REACT_APP_DATABASE_URL + "/api/upload/revert", {
  //     data:{
  //       'file': uniqueId,
  //       headers: {
  //         'token' : this.props.token
  //       }
  //     }
  //   })
  //   .catch(err => console.log(err));
  // }

  const processFiles = () => {
    ref.pond.processFiles().then(files => {
      if ( files.length === 0 ) {
        return files(files = []);
      }
      files(files);
    });
  }


  return (
    <div>
      <FilePond 
        ref={ref}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        data-max-file-size="2MB"
        instantUpload={false}
        
        acceptedFileTypes={['image/*']}
        server={{
          url: process.env.REACT_APP_BACKEND + "/api/upload",
          process: {
            url: '/process',
            headers: {
              'token': token
            }
          },
          revert: null,
          restore: null,
          load: null,
          fetch: null
        }}
        onupdatefiles={(fileItems) => {
          files(fileItems);
        }}/>
    </div>
  )
}

export const PictureUpload = ({token, profilePictures}) => {
  return (
    <div className="h-193px w-193px">
      <FilePond
        labelIdle={`Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`}
        imagePreviewHeight= {170}
        data-max-file-size="1MB"
        imageCropAspectRatio= '1=1'
        imageResizeTargetWidth= {200}
        imageResizeTargetHeight= {200}
        stylePanelLayout= 'compact circle'
        styleLoadIndicatorPosition= 'center bottom'
        styleProgressIndicatorPosition= 'right bottom'
        styleButtonRemoveItemPosition= 'left bottom'
        styleButtonProcessItemPosition= 'right bottom'
        instantUpload={false}
        acceptedFileTypes={['image/*']}
        server={{
          url: process.env.REACT_APP_BACKEND + "/api/upload",
          process: {
            url: '/process',
            headers: {
              'token': token
            }
          },
          revert: null,
          restore: null,
          load: null,
          fetch: null
        }}
        onupdatefiles={(fileItems) => {
          profilePictures(fileItems);
        }}/>      
    </div>
  )
}

