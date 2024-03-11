import React, { useEffect } from 'react';
import RadioBtnSingle from './Ui/RadioBtnSingle';

const RadioBtn = ({ option1, option2, name, onChange, beforeGender }) => {
  /*   useEffect(() => {
    console.log(beforeGender);
  }); */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-4">
      <RadioBtnSingle
        key={option1}
        option={option1}
        name={name}
        onChange={onChange}
        value="1"
        beforeGender={beforeGender && beforeGender === '모두'}
      />
      <RadioBtnSingle
        key={option2}
        option={option2}
        name={name}
        onChange={onChange}
        beforeGender={beforeGender && beforeGender === '동성'}
        value="2"
      />
    </div>
  );
};

export default RadioBtn;
