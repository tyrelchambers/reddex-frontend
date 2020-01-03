import React from 'react';

const headwayConfig = () => {
  const HW_config = {
    selector: "#headway", // CSS selector where to inject the badge
    account:  "J5jVZy",
    enabled: true
  }
  
  return window.Headway.init(HW_config);
}

export default headwayConfig;
