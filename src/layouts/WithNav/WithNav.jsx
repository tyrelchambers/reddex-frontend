import React from 'react';
import './WithNav.scss'
import Tabs from '../Tabs/Tabs';

const WithNav = ({tabs, children}) => {
  return (
    <div className="w-100pr d-f mt+">
      <Tabs tabs={tabs}/>

      <section className="bg fx-1 ml-- shadow-lg"> 
        {children}
      </section>
    </div>
  );
}

export default WithNav;
