import React from 'react';
import { IoHome, IoSettingsSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between align-middle h-20 sticky top-0 bg-gray-900 px-4 z-10 ">
      <h1 className="text-2xl z-100 pt-7 ">
        <Link to="/" className="z-100 text-primary flex gap-2">
          <IoHome className="inline-block ml-4 text-center" />
          같이 가요
        </Link>
      </h1>
      <Link to="settings">
        <button className="transition ease-in-out pt-3 hover:rotate-360">
          <IoSettingsSharp className="text-2xl ss:text-4xl fill-gray-300 hover:animate-spin" />
        </button>
      </Link>
    </header>
  );
};

export default Header;