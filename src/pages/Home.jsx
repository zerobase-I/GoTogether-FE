import React, { useState } from 'react';
import UserInfo from '../components/UserInfo';
import SearchBox from '../components/SearchBox';
import PostBox from '../components/PostBox';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');

  const searchItems = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search box click!');
  };

  return (
    <main className="mt-4 mx-4 pb-3 flex flex-col ">
      <UserInfo />
      <SearchBox
        onChange={searchItems}
        onSearchClick={handleSearchClick}
        searchInput={searchInput}
      />
      <PostBox searchInput={searchInput} onSearchClick={handleSearchClick} />
    </main>
  );
};

export default Home;
