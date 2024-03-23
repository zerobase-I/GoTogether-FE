import React from 'react';
import UserInfo from '../components/UserInfo';

import UserInfoDetail from '../components/UserInfoDetail';
import MyPostBox from '../components/Ui/MyPostBox';

const MyPage = () => {
  return (
    <main className="mt-3 pb-3 flex flex-col mx-4">
      <article>
        <UserInfo />
        <UserInfoDetail />
        <section className="mt-9 border-t">
          <h3>
            <span className="text-xl block mt-5">내가 쓴 게시물</span>
          </h3>
          <MyPostBox />
        </section>
      </article>
    </main>
  );
};

export default MyPage;
