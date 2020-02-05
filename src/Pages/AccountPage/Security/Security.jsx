import React, { useEffect, useState } from 'react';
import EditUserForm from '../../../components/Forms/EditUserForm'
import { toast } from 'react-toastify';
import HR from '../../../components/HR/HR';
import { MainButton } from '../../../components/Buttons/Buttons';
import './Security.scss'
import { getAxios } from '../../../api';

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

  const changeEmailHandler = async (e) => {
    e.preventDefault();
    
    await getAxios({
      url: '/profile/update/email',
      method: 'put',
      data: {
        email: changes.email
      }
    }).then(res => {
      UserStore.setCurrentUser(res)
      toast.success("Changes saved");
    })

  }
  const changePasswordHandler = async (e) => { 
    e.preventDefault();

    if ( changes.newPassword.length < 8 ) return toast.error("Password must be longer than 8 characters") 
    if ( changes.newPassword !== changes.confirmPassword ) return toast.error("Confirmation password and new password, don't match")
    if (!changes.currentPassword) return toast.error("Please provide your current password");

    await getAxios({
      url: '/profile/update/password',
      method: 'put',
      data: changes
    })

    window.location.reload()
   }

   const deleteAccountHandler = async () => {
     const prompt = window.confirm("Are you sure you want to delete your account?");

     if ( prompt ) {
        await getAxios({
          url: '/profile/delete',
          method: 'delete',
          params: {
            uuid: u.uuid
          }
        })
        
        window.localStorage.clear();
        window.location.search = ""
        window.location.pathname = "/"
     }
   }

  return (
    <div className="account-security-wrapper">
      <h4 className="mt+">Your registered email: {u.email}</h4>

      <EditUserForm
        stateHandler={stateHandler}
        changeEmailHandler={changeEmailHandler}
        changePasswordHandler={changePasswordHandler}
      />

      <HR
        classes="mt+"
      />
      <h2 className="mt">Danger Zone</h2>
      <p>This action is permanent. This will delete your account forever.</p>
      <MainButton
        value="Delete Account"
        className="btn-tiertiary danger mt-"
        onClick={deleteAccountHandler}
      />
    </div>
  );
}

export default Security;
