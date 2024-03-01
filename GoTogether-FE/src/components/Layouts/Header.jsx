import React from 'react';
import { IoHome, IoSettingsSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between  sticky top-0 bg-gray-900 z-999 pt-4 px-4 ">
      <h1 className="text-2xl z-100 ">
        <Link to="/home/home" className="z-100 text-primary flex">
          <IoHome className="inline-block text-center" />
          같이 가요
        </Link>
      </h1>
      <Link to="settings">
        <button className="transition ease-in-out hover:rotate-360">
          <IoSettingsSharp className="text-2xl ss:text-4xl hover:animate-spin" />
        </button>
      </Link>
    </header>
  );
};

export default Header;
