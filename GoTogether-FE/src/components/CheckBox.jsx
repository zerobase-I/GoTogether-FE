import React, { useEffect, useState } from 'react';

const CheckBox = () => {
  // checkbox value
  const [checkValue, setCheckValue] = useState('');

  function checkOnlyOne(id) {
    console.log('id', id);
    let checkPick = document.getElementsByName('checkWrap');
    Array.prototype.forEach.call(checkPick, function (el) {
      console.log('el', el);
      el.checked = false;
    });
    id.target.checked = true;
    setCheckValue(id.target.defaultValue);
  }

  useEffect(() => {
    // 선택한 value 확인하기
    console.log('체크박스 value', checkValue);
  }, [checkValue]);

  return (
    <>
      <input
        className="btn"
        type="checkbox"
        id="btn1"
        name="checkWrap"
        value="디자인"
        onChange={(e) => checkOnlyOne(e)}
      />
      <label htmlFor="btn1">맛집/카페</label>

      <input
        type="checkbox"
        id="btn2"
        name="checkWrap"
        value="개발"
        onChange={(e) => checkOnlyOne(e)}
      />
      <label htmlFor="btn2">개발</label>

      <input
        type="checkbox"
        id="btn3"
        name="checkWrap"
        value="뚝딱"
        onChange={(e) => checkOnlyOne(e)}
      />
      <label htmlFor="btn3">뚝딱</label>
    </>
  );
};
export default CheckBox;
