import React from 'react';

const OPTIONS_COUNTRY = [
  { key: '한국', value: '한국' },
  { key: '일본', value: '일본' },
  { key: '미국', value: '미국' },
  { key: '캐나다', value: '캐나다' },
  { key: '괌', value: '괌' },
];

const OPTIONS_CITY = [
  { key: '서울', value: '서울' },
  { key: '강릉', value: '강릉' },
  { key: '가평/양평', value: '가평/양평' },
  { key: '부산', value: '부산' },
  { key: '로스엔젤레스', value: '로스엔젤레스' },
];

const SelectCountry = ({ onChange, beforeCountry, beforeCity }) => {
  return (
    <section className="flex flex-col items-center">
      <span className="text-xl w-full text-left font-semibold">
        나라와 도시를 선택하세요
      </span>
      <div className="flex flex-col">
        <label className="form-control w-full max-w-xs ">
          <div className="label">
            <span className="label-text">나라를 선택하세요 (API 찾아보기)</span>
          </div>
          <select
            className="select select-bordered "
            name="travelCountry"
            required
            onChange={onChange}
            value={OPTIONS_COUNTRY.value}
            defaultValue={beforeCountry}
          >
            {OPTIONS_COUNTRY.map((item) => (
              <option value={item.value} key={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">도시를 선택하세요 (API 찾아보기)</span>
          </div>
          <select
            className="select select-bordered"
            name="travelCity"
            required
            onChange={onChange}
            value={OPTIONS_CITY.value}
            defaultValue={beforeCity}
          >
            {OPTIONS_CITY.map((item) => (
              <option value={item.value} key={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
};

export default SelectCountry;
