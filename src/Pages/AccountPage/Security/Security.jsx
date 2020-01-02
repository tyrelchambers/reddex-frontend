import React, { useEffect, useState } from 'react';
import EditUserForm from '../../../components/Forms/EditUserForm'
import { editUserEmail, editUserPassword } from '../../../api/put';
import { toast } from 'react-toastify';

const Security = ({UserStore}) => {
  const [u, setU] = useState();
  const [ changes, setChanges ] = useState({});

  useEffect(() => {
    setU({...UserStore.currentUser})
  }, []);

  if (!u) return null;

  const stateHandler = (e) => {
    setChanges({...changes, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e) => { 
    e.preventDefault();
    
    if (changes.email) await editUserEmail(changes.email).then(res => UserStore.setCurrentUser(res));

    if (changes.newPassword && changes.confirmPassword) {
      if ( changes.newPassword.length < 8 ) return toast.error("Password must be longer than 8 characters") 
      if ( changes.newPassword !== changes.confirmPassword ) return toast.error("Confirmation password and new password, don't match")
      if (!changes.currentPassword) return toast.error("Please provide your current password");

      await editUserPassword(changes)
            .catch(err => toast.error(err));
    }

    toast.success("Changes saved");
    window.location.reload()
   }

  return (
    <div>
      <h4 className="mt+">Your registered email: {u.email}</h4>

      <EditUserForm
        stateHandler={stateHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default Security;
