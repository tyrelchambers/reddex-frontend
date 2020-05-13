
const headwayConfig = () => {
  const HW_config = {
    selector: "#headway", // CSS selector where to inject the badge
    account:  process.env.REACT_APP_HEADWAY,
    enabled: true
  }
  
  return window.Headway.init(HW_config);
}

export default headwayConfig;
