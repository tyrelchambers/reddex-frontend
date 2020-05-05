import React from 'react'
import './SelectField.scss';

const SelectField = ({defaultLabel, data, options, setOptions, prop}) => {
  return (
    <div className="select d-f ai-c" >
      <span 
        className="select-label d-f jc-sb ai-c w-100pr"
        id="selectLabel"
        onClick={dropdownToggle}
      >
        <p id="label" className="mr-">{data[prop] || defaultLabel}</p>
        <i className="fas fa-chevron-down"></i>  
      </span>

      <div className="select-dropdown" id="dropdownList">
        {data.map(x => (
          <div className="select-item" data-value={x.value} data-label={x.label} key={x.label} onClick={e => {
            setHandler(e, options, setOptions, prop)
            resetStyles(e)
          }}>
            {x.label}
          </div>
        ))}
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
  const parent = e.target.closest('.select');
  const childLabel = parent.querySelector('#label');
  childLabel.innerHTML = label;
  return set({...options, [prop]: value});
}

const resetStyles = (e) => {
  const parent = e.target.closest('.select');
  const list = parent.querySelector("#dropdownList");
  parent.classList.remove('expanded-title');
  list.classList.remove('expanded-select');
}


export default SelectField
