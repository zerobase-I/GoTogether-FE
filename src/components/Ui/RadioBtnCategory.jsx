import React from 'react';

const RadioBtnCategory = ({ option, name, onChange }) => {
  return (
    <label className="md:w-1/3 m-1 ">
      <input
        className="peer hidden "
        type="radio"
        value={Object.keys(option)}
        name={name}
        onChange={onChange}
      />

      <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500 mb-1">
        <h2 className="font-medium text-gray-500">{Object.values(option)}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-9 h-9 text-blue-500 invisible group-[.peer:checked+&]:visible"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </label>
  );
};

export default RadioBtnCategory;
