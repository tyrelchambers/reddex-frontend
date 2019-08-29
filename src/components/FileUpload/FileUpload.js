import React, {useState} from 'react'
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUpload = ({maxFiles, allowMultiple, token}) => {
  const [uploadFiles, setUploadFiles] = useState({
    files: []
  })

  deleteExistingFiles(uniqueId) {
    Axios.delete(process.env.REACT_APP_DATABASE_URL + "/api/upload/revert", {
      data:{
        'file': uniqueId,
        headers: {
          'token' : this.props.token
        }
      }
    })
    .catch(err => console.log(err));
  }

  processFiles = () => {
    this.pond.processFiles().then(files => {
      if ( files.length === 0 ) {
        return this.props.files(files = []);
      }
      this.props.files(files);
    });
  }


  return (
    <div>
      <FilePond 
        ref={ref => this.pond = ref}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        data-max-file-size="2MB"
        instantUpload={false}
        server={{
          url: process.env.REACT_APP_BACKEND + "/api/upload",
          process: {
            url: '/process',
            headers: {
              'token': this.props.token
            }
          },
          revert: null,
          restore: null,
          load: null,
          fetch: null
        }}
        onupdatefiles={(fileItems) => {
          uploadFiles({
            files: fileItems.map(fileItem => fileItem.file)
          });
        }}>

        {uploadFiles.files.map(x => (
          <File key={x} src={x}/>
        ))}
      </FilePond>
    </div>
  )
}

export default FileUpload
