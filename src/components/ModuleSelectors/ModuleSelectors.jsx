import React from 'react';
import './ModulesSelectors.scss';
import modules from '../../Pages/Dashboard/Overview/modules'

const ModuleSelectors = ({selectedMod, setSelectedMod}) => {
  const m = modules.map((x, id) => (
   <div key={id} className="module-selector">
      <input type="checkbox" className="module-selector-check" name={x.name} id={x.name} onChange={() => setSelectedMod({[x.name]: !selectedMod[x.name]})} checked={selectedMod[x.name]}/>
      <label htmlFor={x.name} className="module-selector-label">{x.label}</label>
    </div>
  ))
  return (
    <div className="module-selector-wrapper">
      <p className="mt- mb-">Select modules to display</p>

      {m}
    </div>
  );
}

export default ModuleSelectors;
