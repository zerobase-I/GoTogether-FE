import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { TbZoomInAreaFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';

const SearchBox = ({ searchInput, onChange, onSearchClick }) => {
  return (
    <section className="flex justify-between  border-b-2 pb-4">
      <label className="input input-bordered flex items-center gap-2 mr-8 flex-grow">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchInput}
          onChange={onChange}
        />
        <IoSearch className="text-2xl cursor-pointer" onClick={onSearchClick} />
      </label>
      <button>
        <AiFillEye className="text-2xl mr-2" />
      </button>
      <button>
        <FaRegHeart className="text-2xl mr-2" />
      </button>
      <button>
        <Link to="/filter">
          <TbZoomInAreaFilled className="text-2xl" />
        </Link>
      </button>
    </section>
  );
};

export default SearchBox;
