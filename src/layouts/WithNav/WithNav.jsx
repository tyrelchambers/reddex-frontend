import React from 'react';
import './WithNav.scss'
import Tabs from '../Tabs/Tabs';

const WithNav = ({tabs, children, optionalTabs}) => {
  return (
    <div className="w-100pr d-f mt+">
      <Tabs tabs={tabs} optionalTabs={optionalTabs}/>

      <section className="bg fx-1 ml-- shadow-lg animated fadeIn faster w-100pr" style={{height: 'fit-content'}}> 
        {children}
      </section>
    </div>
  );
}

export default WithNav;
