import React from 'react';
import UserInfo from '../components/UserInfo';
import PostBox from '../components/PostBox';
import UserInfoDetail from '../components/UserInfoDetail';

const MyPage = () => {
  return (
    <main className="mt-3 pb-3 flex flex-col mx-4">
      <article>
        <UserInfo />
        <UserInfoDetail />
        <section className="mt-20 border-t">
          <h3>
            <span className="text-xl block mt-5">지난 동행</span>
          </h3>
          <PostBox />
        </section>
      </article>
    </main>
  );
};

export default MyPage;
