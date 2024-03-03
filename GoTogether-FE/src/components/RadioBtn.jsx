import React from 'react';
import RadioBtnSingle from './Ui/RadioBtnSingle';

const RadioBtn = ({ option1, option2, name, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-4">
      <RadioBtnSingle option={option1} name={name} onChange={onChange} />
      <RadioBtnSingle option={option2} name={name} onChange={onChange} />
    </div>
  );
};

export default RadioBtn;
