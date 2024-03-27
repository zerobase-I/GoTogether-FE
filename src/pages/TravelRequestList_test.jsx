import React, { useEffect, useState } from 'react';
import useAccompany from '../components/hooks/useAccompany';
import {
  getRequestAccompanyList,
  postApproveAccompany,
  postRejectAccompany,
} from '../api/accompany';
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

const TravelRequestList_test = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [requestPostLists, setRequestPostLists] = useState([]);

  async function fetchData() {
    const requestList = await getRequestAccompanyList();
    const postIdList = requestList.map((list) => list.postId);

    async function fetchPost(postId) {
      const postList = await getPostDetail(postId);
      const arrayPostList = Object.entries(postList).map(([key, value]) => ({
        key,
        value,
      }));
      console.log(arrayPostList);

      setRequestPostLists(...requestPostLists, arrayPostList);
    }

    postIdList.map((postId) => {
      fetchPost(postId);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(requestPostLists);
  }, [requestPostLists]);

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
        </ul>
      </div>
    </div>
  );
};

export default TravelRequestList_test;
