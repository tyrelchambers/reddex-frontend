import React, { useState } from 'react'
import './Approval.scss';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import ApprovalForm from '../../components/Forms/ApprovalForm';
import Axios from 'axios';

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
      className="wrapper  center"
    >
       <div className="mt+ d-f fxd-c ai-c">
        <h1>Approval Form</h1>
        <p className="mb+">Fill out this form to be considered for enhanced Reddex features. Keep in mind, this site is in constant development.</p>

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
  
  Axios.post(`${process.env.REACT_APP_BACKEND}/api/approval`, {
    ...data
  })
  .then()
  .catch();
}

export default Approval
