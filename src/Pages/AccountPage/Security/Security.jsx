import React, { useEffect, useState } from 'react';
import EditUserForm from '../../../components/Forms/EditUserForm'
import { toast } from 'react-toastify';
import HR from '../../../components/HR/HR';
import { MainButton } from '../../../components/Buttons/Buttons';
import './Security.scss'
import { getAxios } from '../../../api';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const Security = ({UserStore}) => {
  const [u, setU] = useState();
  const [ changes, setChanges ] = useState({});

  useEffect(() => {
    setU({...UserStore.currentUser})
    
    const fn = async () => {
      const params = new URLSearchParams(window.location.search);
      const approvalStatus = params.get("code") ? params.get("code") : false;

      if ( approvalStatus !== false) {
        
        const accessToken = await getAxios({
          url:'/patreon/getTokens',
          method: "post",
          data: {
            code: approvalStatus
          }
        }).then(res => {
          if (res) {
            return res
          }
        })
        
        getAxios({
          url:"/patreon/identity",
          params: {
            access_token: accessToken
          }
        }).then(res => {
          UserStore.setPatron(res)
          window.location.search = "t=security"
        })
      }
    }
    fn()

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

  const linkPatreonAccount = () => {
    window.location.href = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_PATREON_ID}&redirect_uri=http://localhost:3000/dashboard/account?t=security&scope=identity identity.memberships`
  }

  const disconnectPatreonAccount = () => {
    getAxios({
      url: '/patreon/disconnect',
      method: 'delete'
    }).then(res => {
      if (res) {
        UserStore.setPatron({})
        toast.success("Patreon successfully disconnected")
      }
    })
  }

  return (
    <div className="account-security-wrapper">
      <p className="mt+">Your registered email: {u.email}</p>

      <EditUserForm
        stateHandler={stateHandler}
        changeEmailHandler={changeEmailHandler}
        changePasswordHandler={changePasswordHandler}
      />

      <HR
        classes="mt+"
      />

      <section className="mt+">
        <h3 className="mt-"><i className="fab fa-patreon mr-"></i> Connect your Patreon</h3>
        <p>Link to your Patreon account in order to receive any benefits supplied by your pledge tier.</p>
        {UserStore.patron.patreon_tier &&
          <MainButton
            value="Diconnect Patreon"
            className="btn-tiertiary danger mt-"
            onClick={disconnectPatreonAccount}
          />
        }
        
        {!UserStore.patron.patreon_tier &&
          <MainButton
            value="Link to your Patreon"
            className="btn btn-green p- mt-"
            onClick={linkPatreonAccount}
          />
        }
      </section>

      <HR
        classes="mt+"
      />
      <h2 className="mt">Danger Zone</h2>
      <p style={{color: 'var(--textLight)'}}>This action is permanent. This will delete your account forever.</p>
      <MainButton
        value="Delete Account"
        className="btn-tiertiary danger mt-"
        onClick={deleteAccountHandler}
      />
    </div>
  );
}

export default inject("UserStore")(observer(Security));
