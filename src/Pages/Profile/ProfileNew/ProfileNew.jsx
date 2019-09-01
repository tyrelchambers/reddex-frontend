import React, {useState} from 'react'
import DisplayWrapper from '../../../layouts/DisplayWrapper/DisplayWrapper';
import NewProfileForm from '../../../components/Forms/NewProfileForm';

const ProfileNew = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    headline: "",
    website: "",
    twitter:"",
    facebook: "",
    youtube: ""
  });

  const [filesData, setFilesData] = useState({
    files: [],
    profilePicture: []
  });

  const stateHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const profilePictureHandler = (value) => {
    setFilesData({...filesData, profilePicture: value[0] ? value[0].file : {}})
  }

  const fileUploadHandler = (value) => {
    setFilesData({...filesData, files: value[0] ? value[0].file : {}})
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data)
  }
  return (
    <DisplayWrapper  
      hasHeader={true}
      className="d-f fxd-c ai-c wrapper center mb+"
    >
      <h1 className="mt+">Create Your Writing Profile</h1>
      <NewProfileForm
        stateHandler={stateHandler}
        submitHandler={submitHandler}
        profilePictureHandler={profilePictureHandler}
        fileUploadHandler={fileUploadHandler}
        state={data}
      />
    </DisplayWrapper>
  )
}

export default ProfileNew
