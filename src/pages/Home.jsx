import React from 'react';
import UserInfo from '../components/UserInfo';
import SearchBox from '../components/SearchBox';
import PostBox from '../components/PostBox';

const Home = () => {
  return (
    <main className="mt-4 mx-4 pb-3 flex flex-col ">
      <article>
        <UserInfo />
        <SearchBox />
      </article>

      <PostBox />
    </main>
  );
};

export default Home;
