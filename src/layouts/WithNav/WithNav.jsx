import React from "react";
import "./WithNav.scss";
import Tabs from "../Tabs/Tabs";

const WithNav = ({ tabs, children, optionalTabs }) => {
  const url = window.location.pathname;

  // allows the section to scroll on x axis
  const overflowBody =
    url.includes("reading_list") ||
    url.includes("contacts") ||
    url.includes("inbox");
  return (
    <div className="w-full d-f mt+  with-nav-wrapper h-full">
      <Tabs tabs={tabs} optionalTabs={optionalTabs} />

      <section
        className="ml-10 animated fadeIn faster with-nav-body  mobile-column h-full p-2 w-full"
        style={{
          ...(overflowBody ? { minWidth: "560px" } : null),
        }}
      >
        {children}
      </section>
    </div>
  );
};

export default WithNav;
