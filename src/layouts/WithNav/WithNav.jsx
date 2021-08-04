import React from "react";
import "./WithNav.scss";
import Tabs from "../Tabs/Tabs";

const WithNav = ({ tabs, children, optionalTabs }) => {
  return (
    <div className="w-full flex mt-6  with-nav-wrapper h-full">
      {tabs && tabs.length > 0 && (
        <Tabs tabs={tabs} optionalTabs={optionalTabs} />
      )}

      <section className=" with-nav-body  mobile-column h-full p-2 w-full">
        {children}
      </section>
    </div>
  );
};

export default WithNav;
