import React, { useEffect, useState } from 'react';
import COUNTRY_CITY_DATA from '../mocks/countryCity.json';

const SelectCountry = ({ onChange, beforeCountry, beforeCity }) => {
  //const [countries, setCountries] = useState(null);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState(beforeCountry);
  const [city, setCity] = useState(beforeCity);

  useEffect(() => {
    const selectedCountryData = COUNTRY_CITY_DATA.find(
      (item) => item.country === beforeCountry,
    );

    if (beforeCity) {
      setCountry(beforeCountry);
      setCity(beforeCity);
    }

    setCountry(beforeCountry);
    setCity(beforeCity);

    setCities(selectedCountryData && selectedCountryData.cities);
  }, [beforeCountry, beforeCity]);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const selectedCountryData = COUNTRY_CITY_DATA.find(
      (item) => item.country === selectedCountry,
    );

    setCountry(selectedCountry);
    setCities(() => (selectedCountryData ? selectedCountryData.cities : []));
    setCity(() => selectedCountryData.cities[0]);
    onChange(e);
    handleCityChange(e);
  };

  // 나라 선택시, 현재 바뀐 도시도 업데이트 해줘야함

  const handleCityChange = (e) => {
    onChange(e);
  };

  return (
    <section className="flex flex-col items-center">
      <span className="text-xl w-full text-left font-semibold">
        나라와 도시를 선택하세요
      </span>
      <div className="flex flex-col">
        <label className="form-control w-full max-w-xs ">
          <div className="label">
            <span className="label-text">나라를 선택하세요</span>
          </div>
          <select
            className="select select-bordered "
            name="travelCountry"
            required
            onChange={handleCountryChange}
            value={country}
          >
            {COUNTRY_CITY_DATA.map((item, index) => (
              <option value={item.country} key={item.country + index}>
                {item.country}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">도시를 선택하세요 </span>
          </div>
          <select
            className="select select-bordered"
            name="travelCity"
            required
            onChange={handleCityChange}
            value={city}
          >
            {cities &&
              cities.map((city, index) => (
                <option value={city} key={city + index}>
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
