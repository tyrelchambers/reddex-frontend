import React from "react";
import Select from "react-select";
import "./SelectField.scss";

const SelectField = ({ options, returnValue }) => {
  return (
    <Select
      options={options}
      defaultValue={options[0]}
      className="select"
      onChange={(v) => returnValue(v.value)}
    />
  );
};

export default SelectField;
