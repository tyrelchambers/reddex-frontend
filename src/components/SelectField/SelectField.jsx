import React from 'react'
import './SelectField.scss';

const SelectField = ({label, data, options, setOptions, prop}) => {

  const selectItems = data.map(x => (
    <div className="select-item" data-value={x.value} data-label={x.label} key={x.label} onClick={e => {
      setHandler(e, options, setOptions, prop)
      resetStyles(e)
    }}>
      {x.label}
    </div>
  ));

  return (
    <div className="select d-f ai-c">
      <span 
        className="select-label d-f jc-sb ai-c"
        onClick={dropdownToggle}
        id="selectLabel"
      >
        <p id="label">{label}</p>
        <i className="fas fa-chevron-down"></i>  
      </span>

      <div className="select-dropdown" id="dropdownList">
        {selectItems}
      </div>
    </div>
  )
}

const dropdownToggle = (e) => {
  const parent = e.target.closest('.select');
  const list = parent.querySelector("#dropdownList");
  
  parent.classList.toggle('expanded-title');
  list.classList.toggle('expanded-select');
}

const setHandler = (e, options, set, prop) => {
  const value = e.target.getAttribute('data-value');
  const label = e.target.getAttribute('data-label');
  changeLabel(e, label)
  return set({...options, [prop]: value});
}

const resetStyles = (e) => {
  const parent = e.target.closest('.select');
  const list = parent.querySelector("#dropdownList");
  
  parent.classList.remove('expanded-title');
  list.classList.remove('expanded-select');
}

const changeLabel = (e, value) => {
  const parent = e.target.closest('.select');
  const label = parent.querySelector('#label');
  label.innerHTML = value;
}

export default SelectField
