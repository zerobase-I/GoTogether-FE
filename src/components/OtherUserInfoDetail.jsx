import React from 'react';

const OtherUserInfoDetail = ({ otherMemberInfo, rating }) => {
  const { address, age, description, gender, instagramId, mbti } =
    otherMemberInfo;

  return (
    <section className=" flex flex-col mt-10 p-4 bg-white shadow-md rounded-lg mx-auto ">
      <div className="text-start mb-2">
        <span className="font-bold mr-2 text-gray-800">동행 점수:</span>
        <span className="text-red-500"> {rating || 5}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">성별:</span>
        <span className="text-blue-500">{gender}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">나이:</span>
        <span className="text-blue-500">{age}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">위치:</span>
        <span className="text-blue-500">{address}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">MBTI:</span>
        <span className="text-blue-500">{mbti}</span>
      </div>
      <div className="text-start mb-2">
        <span className="font-bold mr-2">인스타그램 아이디:</span>
        <span className="text-blue-500">{instagramId}</span>
      </div>
      <div className="block mt-4">
        <span className="font-bold mr-2">자기소개:</span>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
    </section>
  );
};

export default OtherUserInfoDetail;
