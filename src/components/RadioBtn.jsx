import React from 'react';
import RadioBtnSingle from './Ui/RadioBtnSingle';

const RadioBtn = ({
  option1,
  option2,
  option3,
  name,
  onChange,
  beforeGender,
}) => {
  /*   useEffect(() => {
    console.log(beforeGender);
  }); */
  return (
    <div className="flex">
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
        beforeGender={beforeGender && beforeGender === '남성'}
        value="2"
      />
      <RadioBtnSingle
        key={option3}
        option={option3}
        name={name}
        onChange={onChange}
        beforeGender={beforeGender && beforeGender === '여성'}
        value="3"
      />
    </div>
  );
};

export default RadioBtn;
