import React, { useState } from 'react';
import ReactCalendar from '../components/ReactCalendar';
import { categoryLists } from '../components/config/data';
import RadioBtnSingle from '../components/Ui/RadioBtnSingle';
import SelectCountry from '../components/SelectCountry';
import moment from 'moment';

const Filter = () => {
  const [inputs, setInputs] = useState({
    travelCountry: 'KOREA',
    travelCity: 'SEOUL',
    startDate: moment(new Date().toDateString()).format('YYYY-MM-DDTHH:mm:ss'),
    endDate: moment(new Date().toDateString()).format('YYYY-MM-DDTHH:mm:ss'),
    postGenderType: '',
    minimumAge: '18',
    maximumAge: '100',
    recruitsPeople: '6',
    estimatedTravelExpense: '0',
    postCategory: '',
    title: '',
    content: '',
    image: [],
  });

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleCityChange = (firstSelectCity) => {
    setInputs({ ...inputs, travelCity: firstSelectCity });
  };

  return (
    <main className="mx-4 mb-40">
      <SelectCountry
        onChange={handleChangeInfo}
        onCityChange={handleCityChange}
        beforeCountry={inputs.travelCountry}
        beforeCity={inputs.travelCity}
      />

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
            key={Object.keys(category)}
            onChange={handleChangeInfo}
            value={inputs}
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
