import React from 'react';
import OtherUserInfo from '../components/OtherUserInfo';
import OtherUserInfoDetail from '../components/OtherUserInfoDetail';
import { useLocation } from 'react-router-dom';
import useMember from '../components/hooks/useMember';
import Loading from '../components/Loading';
import MyPostBox from '../components/Ui/MyPostBox';
import { UserInfoAtom } from '../recoil/userInfoAtom';
import { useRecoilValue } from 'recoil';

const OtherMember = () => {
  const { state: id } = useLocation();
  const userInfo = useRecoilValue(UserInfoAtom);
  const loginUserId = userInfo.id;

  const {
    getOtherMemberInfoQuery: { data: otherMemberInfo, isLoading },
  } = useMember(id);

  const {
    getMyReviewQuery: { data: otherMemberReview, isLoading: reviewLoading },
  } = useMember(id);

  if (isLoading || reviewLoading) return <Loading />;

  console.log(otherMemberReview);
  return (
    <main className="mt-3 pb-3 flex flex-col mx-4">
      <article>
        <OtherUserInfo otherMemberInfo={otherMemberInfo && otherMemberInfo} />
        <OtherUserInfoDetail
          otherMemberInfo={otherMemberInfo}
          rating={otherMemberReview.rating}
        />
        <section className="mt-9 border-t">
          <h3>
            {loginUserId === id && (
              <span className="text-xl block mt-5">내가 작성한 게시물</span>
            )}
            {loginUserId !== id && (
              <span className="text-xl block mt-5">
                '{otherMemberInfo.nickname}' 님이 작성한 게시물
              </span>
            )}
          </h3>
          <MyPostBox memberId={id} />
        </section>
      </article>
    </main>
  );
};

export default OtherMember;
