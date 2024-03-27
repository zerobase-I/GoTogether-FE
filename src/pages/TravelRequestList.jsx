import React, { useEffect, useState } from 'react';
import useAccompany from '../components/hooks/useAccompany';
import { postApproveAccompany, postRejectAccompany } from '../api/accompany';
import { createChatroom } from '../api/chatroom';
import Loading from '../components/Loading';

const TravelRequestList = () => {
  // 예시로 사용자 데이터를 하드코딩합니다.
  const [activeTab, setActiveTab] = useState('send');

  const requests = [
    {
      id: 1,
      profilePic: 'https://via.placeholder.com/50',
      nickname: 'User 1',
      type: 'send',
    },
    {
      id: 2,
      profilePic: 'https://via.placeholder.com/50',
      nickname: 'User 2',
      type: 'received',
    },
    {
      id: 3,
      profilePic: 'https://via.placeholder.com/50',
      nickname: 'User 3',
      type: 'send',
    },
    {
      id: 4,
      profilePic: 'https://via.placeholder.com/50',
      nickname: 'User 4',
      type: 'received',
    },
  ];

  /*     const requests = [
      {
        id: 1,
        requestMemberId: 1,
        requestedMemberId: 2,
        postId: 2,
        requestStatus: 'WATING',
        createdAt: '2024-01-01T12:04:11',
      },
      {
        id: 2,
        requestMemberId: 1,
        requestedMemberId: 2,
        postId: 2,
        requestStatus: 'WATING',
        createdAt: '2024-01-01T12:04:11',
      },
    ];
    const receive = [
      {
        id: 1,
        requestMemberId: 1,
        requestedMemberId: 2,
        postId: 2,
        requestStatus: 'WATING',
        createdAt: '2024-01-01T12:04:11',
      },
      {
        id: 2,
        requestMemberId: 1,
        requestedMemberId: 2,
        postId: 2,
        requestStatus: 'WATING',
        createdAt: '2024-01-01T12:04:11',
      },
    ];
 */
  const [requestList, setRequestList] = useState([]);
  const [recieveList, setRecieveList] = useState([]);

  const {
    getRequestListQuery: { isLoading, isError, error, data: requestListData },
    getReceiveListQuery: { data: receiveListData },
  } = useAccompany();

  isLoading && <Loading />;
  isError && console.error(error.message);

  // 보낸 요청 목록
  //1. 보낸 요청 목록 조회하기
  //2. 보낸 요청 목록의 requestedMemberId 를 통해 memberAPI를 호출해 해당 회원 정보 조회하기.
  //3. 해당 유저 데이터로 요청 컴포넌트를 만든다.

  //받은 요청 목록
  //1. 받은 요청 목록 조회하기
  //2. 받은 요청 목록의 requestMemberId 를 통해 memberAPI를 호출해 해당 회원 정보 조회하기.
  //3. 해당 유저 데이터로 요청 컴포넌트를 만든다.

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

  return (
     <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl text-center text-gray-800 font-bold mb-6">
        동행 요청 내역
      </h1>
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-md text-lg ${activeTab === 'send' ? 'bg-blue-500 text-white' : 'text-gray-600 bg-white border border-gray-200'} shadow`}
          onClick={() => handleTabClick('send')}
        >
          보낸 동행 요청
        </button>
        <button
          className={`px-4 py-2 rounded-md text-lg ${activeTab === 'received' ? 'bg-blue-500 text-white' : 'text-gray-600 bg-white border border-gray-200'} shadow`}
          onClick={() => handleTabClick('received')}
        >
          받은 동행 요청
        </button>
      </div>
      <div className="border-t-2 border-gray-500 my-4 w-100%"></div>
      <div className="grid grid-cols-1 gap-8 mt-4 mx-4">
        <ul className="space-y-4">
          {activeTab === 'send'
            ? []?.map((data) => (
                <li
                  key={data.id}
                  className="bg-white p-4 flex justify-between gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
                >
                  <img
                    src={data.profilePic}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="font-semibold mr-36">{data.nickname}</p>
                  <p className="mt-2 text-blue-500">수락 대기중</p>
                </li>
              ))
            : [].map((data) => (
                <li
                  key={data.id}
                  className="bg-white p-4 flex justify-between gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
                >
                  <img
                    src={data.profilePic}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="font-semibold mr-36">{data.nickname}</p>

                  <div className="flex items-center">
                    <div className="flex justify-center gap-5 pb-2">
                      <button
                        className="bg-transparent text-blue-500 rounded"
                        onClick={handleApproveBtnClick}
                      >
                        수락
                      </button>
                      <button
                        className="bg-transparent text-blue-500 rounded"
                        onClick={handleRejectBtnClick}
                      >
                        거절
                      </button>
                    </div>
                  </div>
                </li>
              ))}

          {requests
            .filter((request) => request.type === activeTab)
            .map((request) => (
              <li
                key={request.id}
                className="bg-white p-4 flex justify-between gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <img
                  src={request.profilePic}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <p className="font-semibold mr-36">{request.nickname}</p>
                {activeTab === 'received' ? (
                  <div className="flex items-center">
                    <div className="flex justify-center gap-5 pb-2">
                      <button
                        className="bg-transparent text-blue-500 rounded"
                        onClick={handleApproveBtnClick}
                      >
                        수락
                      </button>
                      <button
                        className="bg-transparent text-blue-500 rounded"
                        onClick={handleRejectBtnClick}
                      >
                        거절
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-blue-500">수락 대기중</p>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TravelRequestList;
