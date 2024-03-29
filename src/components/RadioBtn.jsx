import React from 'react';
import RadioBtnSingle from './Ui/RadioBtnSingle';

const RadioBtn = ({ option, name, onChange }) => {
  return (
    <RadioBtnSingle
      key={Object.keys(option)}
      option={option}
      name={name}
      onChange={onChange}
    />
  );
};

export default RadioBtn;
