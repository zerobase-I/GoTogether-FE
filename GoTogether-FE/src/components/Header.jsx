import React from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between  ">
      <h1 className="text-2xl">
        <Link to="/home">같이 가요</Link>
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
