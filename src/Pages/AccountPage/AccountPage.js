import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./AccountPage.scss";
import { inject } from "mobx-react";
import Home from "./subpages/Home/Home";
import AltMessage from "./subpages/AltMessage/AltMessage";
import tabs from "./tabs";
import Security from "./Security/Security";
import Dashboard from "../Dashboard/Dashboard";
import { getAxios } from "../../api";
import WithNav from "../../layouts/WithNav/WithNav";
import { H1, H1Subtitle } from "../../components/Headings/Headings";

const AccountPage = inject("UserStore")(
  observer(({ UserStore }) => {
    const [initialGreeting, setInitialGreeting] = useState("");
    const [repeatGreeting, setRepeatGreeting] = useState("");

    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
      const im = async () => {
        const data = await getAxios({
          url: "/default_message",
        });
        setInitialGreeting(data.initial_message);
      };
      const am = async () => {
        const data = await getAxios({
          url: "/alt_message",
        });
        setRepeatGreeting(data.repeat_message);
      };

      am();
      im();
    }, []);

    return (
      <Dashboard>
        <H1>Account</H1>
        <H1Subtitle>Manage the details of your account.</H1Subtitle>
        <WithNav tabs={tabs}>
          <div className="flex flex-col  account-wrapper">
            {params.get("t") === "security" && (
              <Security UserStore={UserStore} />
            )}

            {params.get("t") === "default_message" && (
              <Home
                UserStore={UserStore}
                initialGreeting={initialGreeting}
                setInitialGreeting={setInitialGreeting}
              />
            )}

            {params.get("t") === "alt_message" && (
              <AltMessage
                UserStore={UserStore}
                setRepeatGreeting={setRepeatGreeting}
                repeatGreeting={repeatGreeting}
              />
            )}
          </div>
        </WithNav>
      </Dashboard>
    );
  })
);

export default AccountPage;
