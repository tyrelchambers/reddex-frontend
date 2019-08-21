import React, { useState } from 'react'
import './Approval.scss';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import ApprovalForm from '../../components/Forms/ApprovalForm';
import Axios from 'axios';
import { toast } from 'react-toastify';

const Approval = () => {

  const [ data, setData ] = useState({
    youtubeChannel: "",
    youtubeLink: "",
    channelType: "",
    email: "",
    fullName: ""
  });

  const dataHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  return (
    <DisplayWrapper 
      hasHeader={true}
      className="wrapper center"
    >
       <div className="mt+ d-f fxd-c ai-c p-">
        <h1>Approval Form</h1>
        <p className="mb+ mw-500 ta-c mt+">Fill out this form to be considered for enhanced Reddex features. Keep in mind, this site is in constant development. <span className="error-text ">All fields are required</span></p>

        <ApprovalForm
          submitHandler={(e) => submitHandler(e, data)}
          dataHandler={dataHandler}
          data={data}
        />
       </div>
    </DisplayWrapper>
  )
}

const submitHandler = (e, data) => {
  e.preventDefault();
  
  if (!data.youtubeChannel || !data.youtubeLink || !data.channelType || !data.channelType || !data.email || !data.fullName) {
    return toast.error("All fields required");
  }

  Axios.post(`${process.env.REACT_APP_BACKEND}/api/approval`, {
    ...data
  })
  .then(res => window.location.pathname = "/")
  .catch();
}

export default Approval
