import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { TbZoomInAreaFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const SearchBox = () => {
  return (
    <section className="flex justify-between  border-b-2 pb-4">
      <label className="input input-bordered flex items-center gap-2 mr-8 flex-grow">
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <button>
        <AiFillEye className="text-2xl mr-2" />
      </button>
      <button>
        <FaRegHeart className="text-2xl mr-2" />
      </button>
      <button>
        <Link to="/home/filter">
          <TbZoomInAreaFilled className="text-2xl" />
        </Link>
      </button>
    </section>
  );
};

export default SearchBox;
