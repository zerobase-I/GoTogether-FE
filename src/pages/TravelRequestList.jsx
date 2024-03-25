import React, { useEffect, useState } from 'react';
import useAccompany from '../components/hooks/useAccompany';
import { postApproveAccompany, postRejectAccompany } from '../api/accompany';
import { createChatroom } from '../api/chatroom';
import Loading from '../components/Loading';

import useMember from '../components/hooks/useMember';
import { getPostDetail } from '../api/postApi';
import usePosts from '../components/hooks/usePosts';
import { useQueries, useQuery } from '@tanstack/react-query';

const requests = [
  {
    id: 1,
    profilePic: 'https://via.placeholder.com/50',
    postTitle: 'dasfasfadfafsdsfd',
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
    postTitle: 'adfasfadfs 3',
    type: 'send',
  },
  {
    id: 4,
    profilePic: 'https://via.placeholder.com/50',
    nickname: 'User 4',
    type: 'received',
  },
];

const TravelRequestList = () => {
  const [activeTab, setActiveTab] = useState('send');

  const {
    getRequestListQuery: { data: postIdOfRequestList },
    getReceiveListQuery: { data: receiveListData },
  } = useAccompany();

  const {
    data: requestPostLists,
    isLoading,
    isError,
    error,
  } = useQueries({
    queries: postIdOfRequestList
      ? postIdOfRequestList.map((postId) => {
          return {
            queryKey: ['postLists', postId],
            queryFn: () => getPostDetail(postId),
          };
        })
      : [],
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;

  if (requestPostLists) {
    console.log(requestPostLists);
    // Render your UI components that depend on requestPostLists
  }

  // 보낸 요청 목록
  //1. 보낸 요청 목록 조회하기
  //2. 보낸 요청 목록의 requestedMemberId 를 통해 memberAPI를 호출해 해당 회원 정보 조회하기.
  //3. 해당 posat 제목으로 요청 컴포넌트를 만든다.
  /*  console.log(requestListData);
  console.log('보낸요청내역 memberPostId'); */
  //console.log(myRequestListPostId);

  //받은 요청 목록
  //1. 받은 요청 목록 조회하기
  //2. 받은 요청 목록의 requestMemberId 를 통해 memberAPI를 호출해 해당 회원 정보 조회하기.
  //3. 해당 유저 데이터로 요청 컴포넌트를 만든다.
  //console.log(receiveListData);

  //console.log(receivePosts && receivePosts);

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
    <div className="container mx-auto py-8">
      <h1 className="text-2xl bg-blue-400 w-64 m-auto rounded-md font-bold mb-4">
        동행 요청 내역
      </h1>
      {isLoading && <Loading />}
      {isError && <p>{error.message}</p>}
      {requestPostLists && console.log(requestPostLists)}
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
            ? requestPostLists &&
              console.log(requestPostLists) &&
              requestPostLists.map((data) => (
                <li
                  key={data.id}
                  className="bg-white p-4 flex justify-between gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
                >
                  {console.log(data)}
                  <img
                    src={data.images}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="font-semibold mr-36">{data.title}</p>
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
                <p className="font-semibold mr-36">{request.postTitle}</p>
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
