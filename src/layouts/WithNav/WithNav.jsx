import React from 'react';
import './WithNav.scss'
import Tabs from '../Tabs/Tabs';

const WithNav = ({tabs, children, optionalTabs}) => {
  const url = window.location.pathname

  const overflowBody = (url.includes("reading_list") || 
                        url.includes("contacts") ||
                        url.includes("inbox"))
  return (
    <div className="w-100pr d-f mt+ overflow-x-auto with-nav-wrapper">
      <Tabs tabs={tabs} optionalTabs={optionalTabs}/>

      <section className="bg fx-1 ml-- shadow-lg animated fadeIn faster with-nav-body m-" style={{height: 'fit-content',  ...(overflowBody ? {minWidth: "560px"} : null) }}> 
        {children}
      </section>
    </div>
  );
}

export default WithNav;
