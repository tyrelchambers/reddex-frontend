import React, {useState} from 'react'
import DisplayWrapper from '../../../layouts/DisplayWrapper/DisplayWrapper';
import NewProfileForm from '../../../components/Forms/NewProfileForm';

const ProfileNew = () => {
  const [data, setDate] = useState();

  const stateHandler = (target, value) => {
    setDate({...data, [target]: value});
  }

  return (
    <DisplayWrapper  
      hasHeader={true}
      className="d-f fxd-c ai-c wrapper center mb+"
    >
      <h1 className="mt+">Create Your Writing Profile</h1>
      <NewProfileForm
        stateHandler={stateHandler}
      />
    </DisplayWrapper>
  )
}

export default ProfileNew
