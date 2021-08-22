import React, { useEffect, useState } from "react";
import EditUserForm from "../../../components/Forms/EditUserForm";
import { toast } from "react-toastify";
import HR from "../../../components/HR/HR";
import { MainButton } from "../../../components/Buttons/Buttons";
import "./Security.css";
import { getAxios } from "../../../api";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { H2 } from "../../../components/Headings/Headings";

const Security = ({ UserStore }) => {
  const [u, setU] = useState();
  const [changes, setChanges] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
  });

  useEffect(() => {
    setU({ ...UserStore.currentUser });

    const fn = async () => {
      const params = new URLSearchParams(window.location.search);
      const approvalStatus = params.get("code") ? params.get("code") : false;

      if (approvalStatus !== false) {
        await getAxios({
          url: "/patreon/getTokens",
          method: "post",
          data: {
            code: approvalStatus,
          },
        }).then((res) => {
          if (res) {
            window.location.search = "t=security";
            return res;
          }
        });
      }
      getAxios({
        url: "/patreon/identity",
      }).then((res) => {
        UserStore.setPatron(res);
      });
    };

    fn();
  }, []);

  if (!u) return null;

  const stateHandler = (e) => {
    setChanges({ ...changes, [e.target.name]: e.target.value });
  };

  const changeEmailHandler = async (e) => {
    e.preventDefault();

    await getAxios({
      url: "/profile/update/email",
      method: "put",
      data: {
        email: changes.email,
      },
    }).then((res) => {
      UserStore.setCurrentUser(res);
      toast.success("Changes saved");
    });
  };
  const changePasswordHandler = async (e) => {
    e.preventDefault();

    if (changes.newPassword.length < 8)
      return toast.error("Password must be longer than 8 characters");
    if (changes.newPassword !== changes.confirmPassword)
      return toast.error("Confirmation password and new password, don't match");
    if (!changes.currentPassword)
      return toast.error("Please provide your current password");

    await getAxios({
      url: "/profile/update/password",
      method: "put",
      data: changes,
    });

    window.location.reload();
  };

  const deleteAccountHandler = async () => {
    const prompt = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (prompt) {
      await getAxios({
        url: "/profile/delete",
        method: "delete",
        params: {
          uuid: u.uuid,
        },
      });

      window.localStorage.clear();
      window.location.search = "";
      window.location.pathname = "/";
    }
  };

  return (
    <div className="account-security-wrapper p-4 shadow-md rounded-md">
      <H2>Login &amp; Security</H2>

      <div className="mt-8">
        <EditUserForm
          stateHandler={stateHandler}
          changeEmailHandler={changeEmailHandler}
          changePasswordHandler={changePasswordHandler}
          state={changes}
        />
      </div>

      <HR classes="mt-6" />
      <div className="mt-2">
        <H2>Danger Zone</H2>
      </div>
      <p style={{ color: "var(--textLight)" }}>
        This action is permanent. This will delete your account forever.
      </p>
      <MainButton
        value="Delete Account"
        className="btn btn-tiertiary danger mt-2"
        onClick={deleteAccountHandler}
      />
    </div>
  );
};

export default inject("UserStore")(observer(Security));
