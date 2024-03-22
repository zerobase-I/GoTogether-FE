import React from 'react';
import { IoHome, IoSettingsSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center h-20 bg-gray-800 px-4 sm:px-6 lg:px-8 shadow-md sticky top-0 z-10">
      <Link to="/" className="flex items-center text-white hover:text-gray-300 transition duration-150 ease-in-out">
        <IoHome className="text-xl md:text-2xl" />
        <span className="ml-2 text-lg md:text-xl font-semibold">같이 가요</span>
      </Link>
      <Link to="/settings" className="transition duration-150 ease-in-out hover:scale-110">
        <IoSettingsSharp className="text-2xl md:text-3xl text-white hover:text-gray-300" />
      </Link>
    </header>
  );
};

export default Header;