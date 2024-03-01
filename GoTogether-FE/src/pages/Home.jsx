import React from 'react';
import UserInfo from '../components/UserInfo';
import SearchBox from '../components/SearchBox';
import PostBox from '../components/PostBox';
import Modal from '../components/Modal';

const Home = () => {
  return (
    <main className="mt-3 pb-3 flex flex-col mx-4">
      <article>
        <UserInfo />
        <SearchBox />
      </article>
      <Modal />
      <PostBox />
    </main>
  );
};

export default Home;
