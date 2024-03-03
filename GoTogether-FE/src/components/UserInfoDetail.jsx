import React from 'react';

const UserInfoDetail = () => {
  return (
    <section className="flex flex-col mt-10">
      <div className="text-start">
        <span className="font-bold">동행 점수:</span>
        60 🔍
      </div>
      <div className="text-start">
        <span className="font-bold">성별 : </span>남성
      </div>
      <div className="text-start">
        <span className="font-bold">나이 :</span> 20대
      </div>
      <div className="text-start">
        <span className="font-bold">위치: </span>한국, 서울
      </div>
      <div className="text-start">
        <span className="font-bold">MBTI : </span>ENTP
      </div>
      <div className="text-start">
        <span className="font-bold">인스타그램 아이디:</span> pages102
      </div>
      <div className="block mt-4">
        <span className="font-bold">자기소개</span>
      </div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus,
        molestias nobis quo distinctio suscipit quibusdam doloribus! Distinctio
        illum ipsam cum aspernatur, dolores aperiam maxime dignissimos, quo
        voluptates facere sed reprehenderit.
      </div>
    </section>
  );
};

export default UserInfoDetail;
