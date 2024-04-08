import React from 'react';
import UserInfo from '../components/UserInfo';
import UserInfoDetail from '../components/UserInfoDetail';
import MyPostBox from '../components/Ui/MyPostBox';
import useMember from '../components/hooks/useMember';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../recoil/userInfoAtom';
import Loading from '../components/Loading';

const MyPage = () => {
  const { id: loginUserMemberId } = useRecoilValue(UserInfoAtom);

  const {
    getMyReviewQuery: { data: myReview, isLoading, isError, error },
  } = useMember(loginUserMemberId);

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;

  console.log(myReview);

  return (
    <main className="mt-3 pb-3 flex flex-col mx-4">
      <article>
        <UserInfo />
        <UserInfoDetail rating={myReview.rating} />
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
