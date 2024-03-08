import React from 'react';
import { useLocation } from 'react-router-dom';

const PostList = () => {
  const {
    state: {
      post: {
        title,
        category,
        startDate,
        finishDate,
        gender,
        travelCountry,
        travelCity,
        minimumAge,
        maximumAge,
        recruitsPeople,
        estimatedTravelExpense,
        content,
        image,
      },
    },
  } = useLocation();

  const handleEditClick = (e) => {
    console.log('Edit 버튼 클릭');
    //1. 수정 페이지로 이동
  };

  const handleDeleteClick = (e) => {
    console.log('delete 버튼 클릭');
  };

  return (
    <article className="mx-4 mt-4">
      <div className="flex justify-between mb-4 text-gray-500">
        <div>
          <span className="mr-2">작성자</span>
          <span>글작성날짜</span>
        </div>
        <div>
          <button onClick={handleEditClick} className="mr-2 text-gray-500">
            수정
          </button>
          <button onClick={handleDeleteClick} className="text-gray-500">
            삭제
          </button>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl mx-1">
        <figure className="h-50 w-full">
          <img src="https://via.placeholder.com/300" alt="샘플이미지" />
        </figure>

        <div className="card-body">
          <h2 className="card-title flex flex-col">
            {title}
            <div className="badge badge-secondary">NEW</div>
            <span className="badge badge-outline">{category}</span>
          </h2>
          <section>
            <div className="text-start text-lg">
              동행인원 : 2/{recruitsPeople}
            </div>
            <div className="flex">
              <div className="mr-4">
                <img
                  src="https://via.placeholder.com/30"
                  alt=""
                  className="rounded-full"
                />
                <span>조이</span>
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/30"
                  alt=""
                  className="rounded-full"
                />
                <span>순신</span>
              </div>
            </div>
          </section>

          <p className="mt-10">🚀 자세한 여행 정보</p>
          <div className="card-actions justify-end"></div>
          <div>
            <p className="test-sm">
              {travelCountry}: {travelCity}
            </p>
            <p className="test-sm">
              {startDate} ~ {finishDate}
            </p>
            <p className="test-sm">현재인원/모집인원: 2/{recruitsPeople}</p>
            <p className="test-sm">
              {gender} , 나이: {minimumAge} ~ {maximumAge}
            </p>
            <p className="test-sm">{category}</p>
            <p className="test-sm">예상 금액 : {estimatedTravelExpense}</p>
          </div>
          <div className="border-t mt-10">
            <span className="mt-10">{content}</span>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-outline btn-info w-full mb-20">
        동행 요청
      </button>
    </article>
  );
};

export default PostList;
