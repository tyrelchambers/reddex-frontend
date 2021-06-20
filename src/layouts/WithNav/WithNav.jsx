import React from "react";
import "./WithNav.scss";
import Tabs from "../Tabs/Tabs";

const WithNav = ({ tabs, children, optionalTabs }) => {
  const url = window.location.pathname;

  const overflowBody =
    url.includes("reading_list") ||
    url.includes("contacts") ||
    url.includes("inbox");
  return (
    <div className="w-100pr d-f mt+  with-nav-wrapper h-full">
      <Tabs tabs={tabs} optionalTabs={optionalTabs} />

      <section
        className="bg ml-- shadow-lg animated fadeIn faster with-nav-body m- mobile-column h-full overflow-x-auto"
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
