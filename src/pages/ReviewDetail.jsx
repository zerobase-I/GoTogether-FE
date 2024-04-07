import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineTrademark } from 'react-icons/ai';
import useMember from '../components/hooks/useMember';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../recoil/userInfoAtom';
import Loading from '../components/Loading';
import { sampleImage } from '../components/config/sampleImg';
import { characteristic } from '../components/config/data';
import { LuHeart } from 'react-icons/lu';

const ReviewDetail = () => {
  const {
    name,
    id: loginUserMemberId,
    profileImageUrl,
  } = useRecoilValue(UserInfoAtom);

  const {
    getMyReviewQuery: { data: myReview, isLoading, isError, error },
  } = useMember(loginUserMemberId);

  console.log();
  return (
    <section className="mb-20 mx-4 mt-4">
      <div className="overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-24 ml-10 mt-5 rounded-full">
                <img src={profileImageUrl || sampleImage} alt="Avatar" />
              </div>
            </div>

            <span className="text-xl ml-5 flex justify-start">{name}</span>
          </div>

          <div className="flex justify-end pr-10 w-1/4">
            <div className="flex">
              <Link to="/reviewdetail">
                <AiOutlineTrademark className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-100 mt-4 rounded-md">
          <p className="p-5 text-nowrap text-center text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            🤍 내가 받은 동행 후기들이에요 🤍
            <br />
            <br />
            🤍 동행 점수를 받아, 신뢰도 높여보세요 🤍
          </p>
        </div>

        <div className="container mx-auto px-3 sm:px-6 pt-2 lg:px-8">
          {isLoading && <Loading />}
          {isError && <p>{error.message}</p>}
          {myReview && console.log(Object.entries(myReview))}
          {myReview && console.log(myReview)}
          <div className="text-2xl mt-4 mb-2">
            나의 동행 점수 :{' '}
            <span className="text-red-700">{myReview && myReview.rating}</span>
          </div>
          {characteristic.map((item) => {
            return (
              <div key={item[0]} className="p-2.5  flex justify-between gap-12">
                <div className="flex items-center gap-5 ml-5">
                  <img
                    src="/src/assets/reviewCount.png"
                    className="w-10 transform scale-x-[-1] w-100"
                    alt="Left Arrow"
                  />
                  <span className="text-xl ">
                    {myReview && myReview[item[0]]}
                  </span>
                </div>
                <div>
                  <div className="bg-blue-500 w-48 p-4 rounded-md">
                    {item[1]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewDetail;
