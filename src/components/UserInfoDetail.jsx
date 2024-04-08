import React from 'react';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../recoil/userInfoAtom';

const UserInfoDetail = ({ rating }) => {
  const { address, age, description, gender, instagramId, mbti } =
    useRecoilValue(UserInfoAtom);

  return (
    <section className="flex flex-col mt-10 p-4 bg-white shadow-md rounded-lg  mx-auto">
      <div className="text-start mb-2">
        <span className="font-bold mr-2 text-gray-800">동행 점수:</span>
        <span className="text-red-500"> {rating || 5}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">나의 성별:</span>
        <span className="text-blue-600">{gender}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">나의 나이:</span>
        <span className="text-blue-600">{age}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">나의위치:</span>
        <span className="text-blue-600">{address}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">나의 MBTI:</span>
        <span className="text-blue-600">{mbti}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">인스타그램 아이디:</span>
        <span className="text-blue-600">{instagramId}</span>
      </div>
      <div className="block mt-4">
        <span className="font-bold mr-2">🤍 자기소개 🤍</span>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
    </section>
  );
};

export default UserInfoDetail;
