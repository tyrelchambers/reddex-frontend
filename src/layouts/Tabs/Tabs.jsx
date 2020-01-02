import React from 'react';
import './Tabs.scss'
import Tab from '../Tab/Tab';

const Tabs = ({data, url}) => {
  const params = new URLSearchParams(window.location.search);

  return (
    <div className="tabs-wrapper">
      {data.map((x, id) => <Tab 
        {...x}
        url={url}
        params={params}
        key={id}
      />)}
    </div>
  );
}

export default Tabs;
