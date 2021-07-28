import React, { useState } from "react";
import LoginForm from "../../components/Forms/LoginForm.jsx";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { getAxios } from "../../api";

const LoginPage = inject("UserStore")(
  observer(({ UserStore }) => {
    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });

    const [loading, setLoading] = useState(false);
    const credentialHandler = (e) => {
      return setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
      });
    };

    const submitHandler = async (e) => {
      e.preventDefault();

      if (!credentials.password) {
        setLoading(false);
        return toast.error("No password provided");
      }
      if (!credentials.email) {
        setLoading(false);
        return toast.error("No email provided");
      }
      const payload = credentials;

      await getAxios({
        url: "/auth/login",
        method: "post",
        data: {
          ...payload,
        },
        options: {
          withToken: false,
        },
      }).then((res) => {
        if (res) {
          UserStore.setToken(res.token);
          UserStore.setCurrentUser(res.user);
          window.localStorage.removeItem("visitorToken");
          if (res.user.reddit_profile) {
            UserStore.setRedditProfile(res.user.reddit_profile);
          }

          if (!res.user.access_token) {
            toast.error(
              "Missing important credentials. Please reauthenicate with Reddit :( Redirecting..."
            );
            window.sessionStorage.setItem("reauth", true);
            return setTimeout(() => {
              window.location.pathname = "/authorize";
            }, 5000);
          }
          window.location.pathname = "/";
        }
      });

      setLoading(false);
    };
    return (
      <DisplayWrapper>
        <div className="d-f jc-c ai-c w-100pr mt+ fxd-c animated fadeIn">
          <h1 className="font-bold">Login to Reddex</h1>
          <LoginForm
            credentialHandler={credentialHandler}
            submitHandler={submitHandler}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </DisplayWrapper>
    );
  })
);

export default LoginPage;
