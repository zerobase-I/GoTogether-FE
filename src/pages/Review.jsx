import React, { useState } from 'react';

import UserInfoSimple from './UserInfoSimple';

const Review = () => {
  const [recruitedPeople, setRecruitedPeople] = useState(3);

  const handleInputChange = (e) => {
    setRecruitedPeople(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="mx-4">
      <h2 className="text-2xl mt-10">동행 후기를 남겨주세요🥰</h2>
      <UserInfoSimple />

      <section className="mt-10 bg-gray-300 py-5 rounded-md">
        <span className="text-sm text-gray-700">
          후기를 남겨주시면 상대당의 동행 점수가 올라갑니다.
        </span>
        <br />
        <span className="text-sm text-gray-700">
          즐거운 여행을 다녀오셨다면 키워드를 남겨주세요❤
        </span>
      </section>

      <form action="" onSubmit={handleSubmit} className="mb-24">
        <section className="mt-10">
          <span className="text-xl block mb-5">
            남기고 싶은 키워드를 선택해 주세요.
          </span>
          <div>
            <button className="btn btn-outline btn-info mr-2 mb-2">
              시간 약속을 잘 지켜요
            </button>
            <button className="btn btn-outline btn-info mr-2  mb-2">
              매너가 좋아요
            </button>
            <button className="btn btn-outline btn-info mr-2  mb-2">
              응답이 빨라요
            </button>
            <button className="btn btn-outline btn-info mr-2  mb-2">
              친절해요
            </button>
            <button className="btn btn-outline btn-info mr-2  mb-2">
              믿음이 가요
            </button>
            <button className="btn btn-outline btn-info mr-2  mb-2">
              듬직해요
            </button>
            <button className="btn btn-outline btn-info">
              준비성이 좋아요
            </button>
          </div>

          <div className="mt-10">
            <span className="mt-10 block mb-5 text-xl">
              상대방의 동행 점수를 평가해 주세요
              <br />
              (1 ~ 5점)
            </span>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={recruitedPeople}
              onChange={handleInputChange}
              className="range range-info"
            />
            <span className="text-xl text-center font-semibold block mb-2 ml-auto mt-5">
              나의 평가 점수 : {recruitedPeople} 점
            </span>
          </div>
        </section>

        <section className="text-end mt-10">
          <button className="btn btn-outline btn-info w-full">완료</button>
        </section>
      </form>
    </main>
  );
};

export default Review;
