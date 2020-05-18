import React from 'react';
import './Dropdown.scss'

const Dropdown = ({triggerIcon, children, width,  toggleDropdown, showDropdown}) => {
  return (
    <div 
      style={{
        width
      }} 
      className="drop-comp-wrapper"
    >
      <span 
        className={`drop-comp-trigger ${showDropdown() ? "active" : ""}`} 
        onClick={toggleDropdown}>
        {triggerIcon}
      </span>

      {showDropdown() &&
        <main className="drop-comp-main shadow-md">
          {children}
        </main>
      }
    </div>
  );
}

export default Dropdown;
