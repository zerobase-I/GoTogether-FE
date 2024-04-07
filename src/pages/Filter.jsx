import React, { useEffect, useState } from 'react';
import ReactCalendar from '../components/ReactCalendar';
import { categoryLists, genders } from '../components/config/data';
import RadioBtnSingle from '../components/Ui/RadioBtnSingle';
import SelectCountry from '../components/SelectCountry';
import moment from 'moment';
import RadioBtn from '../components/RadioBtn';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { filterItem } from '../recoil/filterItem';
import { isFilter } from '../recoil/isFilter';
import { useGoToPage } from '../utils/utils';

const Filter = () => {
  const { goToHome } = useGoToPage();
  const [filterInputs, setFilterInputs] = useRecoilState(filterItem);
  const setIsFilter = useSetRecoilState(isFilter);
  const resetFilterInputs = useResetRecoilState(filterItem);

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;

    setFilterInputs({ ...filterInputs, [name]: value });
  };

  const handleCityChange = (firstSelectCity) => {
    setFilterInputs({ ...filterInputs, travelCity: firstSelectCity });
  };

  const handleDateChange = (dates) => {
    setFilterInputs(() => ({
      ...filterInputs,
      startDate: moment(dates[0].toDateString()).format('YYYY-MM-DDTHH:mm:ss'),
      endDate: moment(dates[1].toDateString()).format('YYYY-MM-DDTHH:mm:ss'),
    }));
  };

  const handleFilterSetClick = () => {
    setIsFilter(true);
    goToHome();
  };

  const handleFilterCancelClick = () => {
    setIsFilter(false);
    resetFilterInputs();
    goToHome();
  };

  useEffect(() => {
    console.log(filterInputs);
  }, [filterInputs]);

  return (
    <main className="mt-4 mx-4 mb-40">
      <SelectCountry
        onChange={handleChangeInfo}
        onCityChange={handleCityChange}
        beforeCountry={filterInputs.travelCountry}
        beforeCity={filterInputs.travelCity}
      />

      <section className="mb-6">
        <ReactCalendar onDateChange={handleDateChange} />
      </section>

      <section className="mb-2">
        <span className="text-xl text-left font-semibold w-max block ">
          함께하고 싶은 성별
        </span>
        <div className="flex">
          {genders.map((gender) => {
            return (
              <RadioBtn
                key={Object.keys(gender)}
                option={gender}
                name="postGenderType"
                onChange={handleChangeInfo}
              />
            );
          })}
        </div>
      </section>

      <section className="mb-6">
        <span className="text-xl w-full text-left font-semibold block mb-2">
          카테고리를 선택하세요
        </span>
        <div className="flex flex-col md:flex-row">
          {categoryLists.map((category) => (
            <RadioBtnSingle
              option={category}
              name="category"
              key={Object.keys(category)}
              onChange={handleChangeInfo}
              value={filterInputs}
            />
          ))}
        </div>
      </section>
      <button
        className="btn btn-outline btn-info w-full mb-1"
        onClick={handleFilterSetClick}
      >
        필터 설정
      </button>
      <button
        className="btn btn-outline btn-error w-full"
        onClick={handleFilterCancelClick}
      >
        <span className="text-red-700">필터 해제</span>
      </button>
    </main>
  );
};

export default Filter;
