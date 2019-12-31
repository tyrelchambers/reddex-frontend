import React, {useState} from 'react';
import ToggleStatus from '../ToggleStatus/ToggleStatus';

const SiteBuilderThemeForm = ({config, configHandler}) => {
  const toggleHandler = (e) => {
    const trg = e.target.closest(".toggle").getAttribute("value");
    const evt = {
      target: {
        name: "theme",
        value: trg
      }
    }
    configHandler(evt)
  }
  
  return (
    <form className="form">
      <div className="field-group ">
        <label htmlFor="accent" className="form-label">Accent Colour (Click box to change)</label>
        <div className="d-f ai-c">
          <input type="color" name="accent" className="colour-picker mr-" value={config.accent} onChange={e => configHandler(e)}/>
          <p>{config.accent}</p>  
        </div>
      </div>
      <div className="field-group ">
        <label htmlFor="accent" className="form-label">Theme Mode</label>
        <div className="d-f ai-c">
         <ToggleStatus
          option="Light"
          setToggledHandler={e => toggleHandler(e, "light")}
          toggled={config.theme === "light" ? true : false}
          context="theme"
         />
         <ToggleStatus
          option="Dark"
          setToggledHandler={e => toggleHandler(e, "dark")}
          toggled={config.theme === "dark" ? true : false}
          context="theme"
         />
        </div>
      </div>
    </form>
  );
}

export default SiteBuilderThemeForm;
