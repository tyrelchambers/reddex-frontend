import React, {useEffect, useState} from 'react';
import './styles.scss';

const DashModuleSelect = ({toggled, setToggled}) => {  
  return (
    <span className={`toggler ${toggled ? "toggled" : ""}`} onClick={() => setToggled(!toggled)}>
      <i className="fas fa-sliders-h"></i>
    </span>
  );
}

export default DashModuleSelect;
