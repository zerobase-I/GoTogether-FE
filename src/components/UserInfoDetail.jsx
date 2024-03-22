import React from 'react';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../recoil/UserInfoAtom';

const UserInfoDetail = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  console.log(userInfo);
  const { address, age, description, gender, instagramId, mbti } =
    useRecoilValue(UserInfoAtom);

  return (
    <section className="flex flex-col mt-10">
      <div className="text-start">
        <span className="font-bold mr-2">동행 점수:</span>
      </div>
      <div className="text-start">
        <span className="font-bold mr-2">성별 : </span>
        {gender}
      </div>
      <div className="text-start">
        <span className="font-bold mr-2">나이 :</span> {age}
      </div>
      <div className="text-start">
        <span className="font-bold mr-2">위치: </span>
        {address}
      </div>
      <div className="text-start">
        <span className="font-bold mr-2">MBTI : </span>
        {mbti}
      </div>
      <div className="text-start">
        <span className="font-bold mr-2">인스타그램 아이디:</span> {instagramId}
      </div>
      <div className="block mt-4">
        <span className="font-bold mr-2">자기소개</span>
      </div>
      <div>{description}</div>
    </section>
  );
};

export default UserInfoDetail;
