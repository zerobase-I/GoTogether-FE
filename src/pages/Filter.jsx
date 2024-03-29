import React, { useState } from 'react';
import ReactCalendar from '../components/ReactCalendar';
import { categoryLists } from '../components/config/data';
import RadioBtnSingle from '../components/Ui/RadioBtnSingle';

const Filter = () => {
  const [value, setValue] = useState(null);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <main className="mx-4 mb-40">
      <section className="flex flex-col items-center mt-3  ">
        <span className="text-xl w-full text-left font-semibold">
          {' '}
          나라와 도시를 선택하세요
        </span>
        <div className="">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                나라를 선택하세요 (API 찾아보기)
              </span>
            </div>
            <select className="select select-bordered" name="country" required>
              <option value="한국">한국</option>
              <option value="일본">일본</option>
              <option value="미국">미국</option>
              <option value="괌">괌</option>
              <option value="사이판">사이판</option>
              <option value="캐나다">캐나다</option>
              <option value="대만">대만</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                도시를 선택하세요 (API 찾아보기)
              </span>
            </div>
            <select className="select select-bordered" name="country" required>
              <option value="서울">서울</option>
              <option value="강릉">강릉</option>
              <option value="가평/양평">가평/양평</option>
            </select>
          </label>
        </div>
      </section>

      <section className="mb-6">
        <ReactCalendar />
      </section>

      <section className="mb-6">
        <span className="text-xl w-full text-left font-semibold block mb-2">
          카테고리를 선택하세요
        </span>
        {categoryLists.map((category) => (
          <RadioBtnSingle
            option={category}
            name="category"
            key={category}
            onChange={handleInputChange}
            value={value}
          />
        ))}
      </section>
      <button type="submit" className="btn btn-outline btn-info w-full mb-1">
        필터 설정
      </button>
      <button type="submit" className="btn btn-outline btn-error w-full">
        <span className="text-red-700">필터 해제</span>
      </button>
    </main>
  );
};

export default Filter;
