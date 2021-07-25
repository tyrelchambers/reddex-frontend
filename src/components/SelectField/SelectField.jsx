import React from "react";
import Select from "react-select";
import "./SelectField.scss";

const SelectField = ({ options, returnValue }) => {
  return (
    <Select
      options={options}
      defaultValue={options[0]}
      className="w-40"
      onChange={(v) => returnValue(v.value)}
    />
  );
};

export default SelectField;
