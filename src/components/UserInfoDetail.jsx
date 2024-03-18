import React from 'react';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../recoil/UserInfoAtom';

const UserInfoDetail = () => {
  //  const userInfo = useRecoilValue(UserInfoAtom);
  const { MBTI, address, age, description, gender, travelScore, instagramId } =
    useRecoilValue(UserInfoAtom);

  return (
    <section className="flex flex-col mt-10">
      <div className="text-start">
        <span className="font-bold">동행 점수:</span>
        {travelScore} 🔍
      </div>
      <div className="text-start">
        <span className="font-bold">성별 : </span>
        {gender}
      </div>
      <div className="text-start">
        <span className="font-bold">나이 :</span> {age}
      </div>
      <div className="text-start">
        <span className="font-bold">위치: </span>
        {address}
      </div>
      <div className="text-start">
        <span className="font-bold">MBTI : </span>
        {MBTI}
      </div>
      <div className="text-start">
        <span className="font-bold">인스타그램 아이디:</span> {instagramId}
      </div>
      <div className="block mt-4">
        <span className="font-bold">자기소개</span>
      </div>
      <div>{description}</div>
    </section>
  );
};

export default UserInfoDetail;
