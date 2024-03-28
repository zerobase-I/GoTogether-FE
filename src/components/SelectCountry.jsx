import React, { useEffect, useState } from 'react';
import COUNTRY_CITY_DATA from '../mocks/countryCity.json';

const SelectCountry = ({
  onChange,
  onCityChange,
  beforeCountry,
  beforeCity,
}) => {
  const [country, setCountry] = useState(beforeCountry);
  const [city, setCity] = useState(beforeCity);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const selectedCountryData = COUNTRY_CITY_DATA.find(
      (item) => item.country === beforeCountry,
    );

    setCountry(beforeCountry); // 나라 초기값
    setCity(beforeCity); // 도시 초기값

    setCities(selectedCountryData.cities); // 선택된 나라의 도시로 바꾸기
  }, [cities, beforeCity, beforeCountry]);

  useEffect(() => {
    onCityChange(cities[0]);
  }, [cities]);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const selectedCountryData = COUNTRY_CITY_DATA.find(
      (item) => item.country === selectedCountry,
    );

    setCountry(selectedCountry);
    setCities(selectedCountryData.cities);

    onChange(e);
  };

  const handleCityChange = (e) => {
    onChange(e);
  };

  return (
    <section className="flex flex-col items-center mb-6">
      <span className="text-xl w-full text-left font-semibold ">
        나라와 도시를 선택하세요
      </span>

      <div className="flex  w-full">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text text-sm text-gray-400">나라선택</span>
          </div>
          <select
            className="select select-bordered appearance-none border-2 border-blue-500  hover:border-blue-500 hover:border-2 active:outline-none "
            name="travelCountry"
            required
            onChange={handleCountryChange}
            value={country}
          >
            {COUNTRY_CITY_DATA.map((item, idx) => (
              <option value={item.country} key={item.country + idx}>
                {item.country}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full ml-2 ">
          <div className="label">
            <span className="label-text text-sm text-gray-400">도시선택</span>
          </div>
          <select
            className="select select-bordered border-2 border-blue-500   hover:border-blue-500 hover:border-2"
            name="travelCity"
            required
            onChange={handleCityChange}
            value={city}
          >
            {cities &&
              cities.map((city, idx) => (
                <option value={city} key={city + idx}>
                  {city}
                </option>
              ))}
          </select>
        </label>
      </div>
    </section>
  );
};

export default SelectCountry;
