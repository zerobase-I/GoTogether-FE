import React, { useState } from 'react';
import useAccompany from '../components/hooks/useAccompany';
import { postApproveAccompany, postRejectAccompany } from '../api/accompany';
import { createChatroom } from '../api/chatroom';
import Loading from '../components/Loading';
import { sampleImage, sampleImgHands } from '../components/config/sampleImg';

/* const mockRequestList = [
  {
    id: 1,
    requestMemberId: 1,
    requestedMemberId: 2,
    postId: 2,
    postTitle: 'request1 가실분',
    requestStatus: 'WATING',
    createdAt: '2024-01-01T12:04:11',
  },
  {
    id: 2,
    requestMemberId: 1,
    requestedMemberId: 2,
    postId: 2,
    postTitle: 'request2 가실분',
    requestStatus: 'WATING',
    createdAt: '2024-01-01T12:04:11',
  },
];
const mockRecieveList = [
  {
    id: 1,
    requestMemberId: 1,
    nickname: 'zero',
    mbti: 'ENFP',
    profileImage: sampleImage,
    requestedMemberId: 2,
    postId: 2,
    postTitle: 'recieve1 가실분',
    requestStatus: 'WATING',
    createdAt: '2024-01-01T12:04:11',
  },
  {
    id: 2,
    requestMemberId: 1,
    nickname: 'zero',
    mbti: 'ISFP',
    profileImage: sampleImage,
    requestedMemberId: 2,
    postId: 2,
    postTitle: 'recieve2 가실분',
    requestStatus: 'WATING',
    createdAt: '2024-01-01T12:04:11',
  },
]; */

const TravelRequestList = () => {
  const [activeTab, setActiveTab] = useState('send');

  const {
    getRequestListQuery: { isLoading: isRequestListLoading, data: RequestList },
    getReceiveListQuery: {
      isLoading: isReceiveListLoading,
      isError,
      error,
      data: receiveList,
    },
  } = useAccompany();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleApproveBtnClick = async () => {
    console.log('수락버튼 클릭');
    //1. 동행 요청 승인하기 api 요청
    await postApproveAccompany();

    //2. 요청온 관련 컴포넌트 제거하기

    //createChatroom 인수로 해당 postId를 보내줘야함
    //3. 채팅방 생성하기
    await createChatroom();
    console.log('채팅방 생성 완료');
  };
  const handleRejectBtnClick = () => {
    console.log('거절 버튼 클릭');
    //1 동행 요청 거절하기 api 요청
    //2. 요청온 관련 컴포넌트 제거하기
    postRejectAccompany();
  };

  if (isRequestListLoading) return <Loading />;
  if (isReceiveListLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;

  console.log(RequestList && RequestList);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl bg-blue-400 w-64 m-auto rounded-md font-bold mb-4">
        동행 요청 내역
      </h1>

      <div className="flex justify-center mb-4 gap-7">
        <button
          className={`mr-4 ${activeTab === 'send' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => handleTabClick('send')}
        >
          보낸 동행 요청
        </button>
        <button
          className={`${activeTab === 'received' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => handleTabClick('received')}
        >
          받은 동행 요청
        </button>
      </div>
      <div className="border-t-2 border-gray-500 my-4 w-100%"></div>
      <div className="grid grid-cols-1 gap-8 mt-4 mx-4">
        <ul className="space-y-4">
          {activeTab === 'send'
            ? RequestList &&
              RequestList.map((list) => (
                <li
                  key={list.id}
                  className="bg-white p-2 flex justify-between items-center  gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
                >
                  <img
                    src={sampleImgHands}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <p className="font-semibold text-sm ">{list.postTitle}</p>
                  <p className="btn btn-outline btn-warning  text-blue-500">
                    수락 대기중
                  </p>
                </li>
              ))
            : receiveList &&
              receiveList.map((list) => (
                <li
                  key={list.id}
                  className="bg-white p-4 flex justify-between items-center gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
                >
                  <div className="flex basis-40 items-center">
                    <img
                      src={list.profileImage}
                      alt="Profile"
                      className="w-12 h-12 rounded-full mr-2 md:mr-4"
                    />
                    <div className="">
                      <p className="text-xs md:text-base ">{list.nickname}</p>
                      <p className="text-xs ">{list.mbti}</p>
                    </div>
                  </div>
                  <p className="font-semibold  text-xs md:text-base mr-4 ">
                    {list.postTitle}
                  </p>

                  <div className="flex items-center">
                    <div className="flex justify-center gap-2 ">
                      <button
                        className="btn btn-outline btn-info bg-transparent text-blue-500 rounded text-sx p-3 "
                        onClick={handleApproveBtnClick}
                      >
                        <p className="">수락</p>
                      </button>
                      <button
                        className="btn btn-outline btn-error bg-transparent text-red-500 rounded p-3"
                        onClick={handleRejectBtnClick}
                      >
                        거절
                      </button>
                    </div>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default TravelRequestList;
