import React, { useEffect, useState } from 'react';
import UserInfoSimple from './UserInfoSimple';
import { useGetReviewerList } from '../components/hooks/useAccompany';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { sampleImage } from '../components/config/sampleImg';
import { useGoToPage } from '../utils/utils';

const checkBoxList = [
  {
    id: 'punctuality',
    name: '시간엄수',
  },
  {
    id: 'responsiveness',
    name: '사려깊음',
  },
  {
    id: 'photography',
    name: '사진고수',
  },
  {
    id: 'manner',
    name: '매너최고',
  },
  {
    id: 'navigation',
    name: '길 찾기의 신 ',
  },
  {
    id: 'humor',
    name: '유머러스함',
  },
  {
    id: 'adaptability',
    name: '편안함',
  },
];
let click = 0;

const Review = () => {
  const { state: postId } = useLocation();
  const [reviews, setReviews] = useState([]);

  const [reviewsValue, setReviewsValue] = useState({
    score: 3,
    punctuality: false,
    responsiveness: false,
    photography: false,
    manner: false,
    navigation: false,
    humor: false,
    adaptability: false,
  });

  const { goToAlarm } = useGoToPage();

  const {
    ReviewerList: { data: reviewerList, isLoading, isError, error },
    writeReview,
  } = useGetReviewerList(postId);

  const addReviews = (e) => {
    const memberId = reviewerList && reviewerList.map((list) => list.memberId);
    console.log(123);
    e.preventDefault();

    let newReviews;

    newReviews = {
      ...reviewsValue,
      targetMemberId: memberId[click++],
      postId: postId,
    };

    setReviews([...reviews, newReviews]);
    alert('저장완료');
  };

  console.log(reviewerList);

  useEffect(() => {
    click = 0;
  }, []);

  useEffect(() => {
    console.log(reviewsValue, reviews);
  }, [reviewsValue, reviews]);

  const handleChangeInfo = (e) => {
    const { name, value, checked } = e.target;
    console.log(checked);

    if (
      name === 'punctuality' ||
      name === 'responsiveness' ||
      name === 'photography' ||
      name === 'manner' ||
      name === 'navigation' ||
      name === 'humor' ||
      name === 'adaptability'
    ) {
      setReviewsValue({ ...reviewsValue, [name]: checked });
    } else setReviewsValue({ ...reviewsValue, [name]: +value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    writeReview.mutate(reviews, {
      onSuccess: () => {
        alert('리뷰가 성공적으로 남겨졌습니다.!');
      },
      onError: () => {
        alert('리뷰 남기기요청이 네트워크 문제로 실패했습니다.!');
      },
    });
    goToAlarm();
  };

  return (
    <main className="mx-4">
      <h2 className="text-2xl mt-10">동행 후기를 남겨주세요🥰</h2>
      <UserInfoSimple />
      <section className="mt-10 bg-gray-300 py-5 rounded-md">
        <span className="text-sm text-gray-700">
          후기를 남겨주시면 상대방의 동행 점수가 올라갑니다.
        </span>
        <br />
        <span className="text-sm text-gray-700">
          즐거운 여행을 다녀오셨다면 키워드를 남겨주세요❤
        </span>
      </section>
      <form onSubmit={handleSubmit} className="mb-24">
        {isLoading && <Loading />}
        {isError && <p>{error.message}</p>}
        {reviewerList && Array.isArray(reviewerList) ? (
          reviewerList.map((memberList) => {
            return (
              <section className="border mt-4 mx-4" key={memberList.memberId}>
                <article className="mt-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="avatar mb-2">
                      <div className="w-20 rounded-full">
                        <img src={sampleImage} className="" />
                      </div>
                    </div>
                    <span className="text-blue-800 font-bold text-lg">
                      " {memberList.nickname} "
                    </span>
                    <span className="text-sm text-gray-600">
                      님과의 동행에 대해 평가해주세요!
                    </span>
                  </div>

                  <span className="text-sm block mb-5">
                    남기고 싶은 키워드를 선택해 주세요.
                  </span>

                  <ul className="grid w-full gap-0 md:grid-cols-3">
                    {checkBoxList.map((item, idx) => {
                      return (
                        <div className="form-control" key={idx}>
                          <label className="label cursor-pointer">
                            <span className="label-text">{item.name}</span>
                            <input
                              name={item.id}
                              type="checkbox"
                              className="checkbox"
                              onChange={handleChangeInfo}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </ul>

                  <div className="mt-10">
                    <span className="mt-10 block mb-5 text-sm">
                      상대방의 동행 점수를 평가해 주세요
                      <br />
                      (1 ~ 5점)
                    </span>
                    <input
                      name="score"
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      className="range range-info"
                      value={reviewsValue.score}
                      onChange={handleChangeInfo}
                    />
                    <p className="text-xl text-center font-semibold block mb-2 ml-auto mt-5">
                      <span>
                        나의 평가 점수 :{' '}
                        <span className="text-red-500">
                          {reviewsValue.score}
                        </span>{' '}
                        점
                      </span>
                    </p>
                  </div>
                </article>
                <button onClick={addReviews}>저장</button>
              </section>
            );
          })
        ) : (
          <p>리뷰 대상자가 없습니다</p>
        )}
        <button className="btn btn-outline btn-success mt-4">제출하기</button>
      </form>
    </main>
  );
};

export default Review;
