import React, { useState } from 'react';
import { useAccompany } from '../components/hooks/useAccompany';
import Loading from '../components/Loading';
import {
  sampleImageProfile,
  sampleImgHands,
} from '../components/config/sampleImg';
import { createChatroom, enterChatRoom } from '../api/chatroom';

const TravelRequestList = () => {
  const [activeTab, setActiveTab] = useState('send');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const {
    getRequestListQuery: { isLoading: isRequestListLoading, data: requestList },
    getReceiveListQuery: {
      isLoading: isReceiveListLoading,
      isError,
      error,
      data: receiveList,
    },
    approveAccompany,
    rejectAccompany,
  } = useAccompany();

  const handleApproveBtnClick = async (
    requestListId,
    postId,
    requestMemberId,
  ) => {
    console.log(`동행요청 고유 아이디 ${requestListId}`);
    console.log(`게시글 아이디 ${postId}`);
    console.log(`요청멤버아이디 ${requestMemberId}`);
    approveAccompany.mutate(requestListId, {
      onSuccess: (chatRoomId) => {
        alert('요청 수락이 성공적으로 이루어졌습니다!');
        console.log(`요청멤버아이디 ${requestMemberId}`);

        if (!chatRoomId) {
          createChatroom(postId, requestMemberId)
            .then((res) => {
              console.log(res);
              alert('채팅방 생성 성공!');
            })
            .catch((err) => console.error(err));
        } else {
          enterChatRoom(chatRoomId, requestMemberId);
        }
      },
      onError: () => {
        alert('요청 수락이 네트워크 오류로 실패했습니다. 잠시후 다시 ');
      },
    });
  };

  const handleRejectBtnClick = (requestListId) => {
    console.log('거절 버튼 클릭');
    console.log(requestListId);
    //1 동행 요청 거절하기 api 요청
    //2. 요청온 관련 컴포넌트 제거하기
    rejectAccompany.mutate(requestListId, {
      onSuccess: () => {
        alert('요청 거절 성공');
      },
      onError: () => {
        alert('요청 거절 실패');
      },
    });
  };

  console.log(receiveList && receiveList);

  return (
    <main className="container mx-auto mt-4 px-4">
      <h1 className="text-3xl text-center text-gray-800 font-bold mb-6">
        동행 요청 내역
      </h1>

      <div className="flex justify-center mb-4 gap-7">
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
      <div className="grid grid-cols-1 gap-8 mt-4 mx-4 mb-20">
        <ul className="space-y-4">
          {isRequestListLoading && isReceiveListLoading && <Loading />}
          {isError && <>{error.message}</>}

          {activeTab === 'send'
            ? Array.isArray(requestList) && (
                <>
                  <div>
                    <p className="mr-10 font-semibold">글 제목</p>
                  </div>
                  {requestList.map((list) => (
                    <li
                      key={list.id}
                      className="py-8 bg-white p-2 flex justify-between items-center  gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
                    >
                      <img
                        src={sampleImgHands}
                        alt="Profile"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                      />
                      <p className="font-semibold text-sm text-gray-500 basis-36 whitespace-nowrap overflow-hidden text-ellipsis">
                        {list.postTitle}
                      </p>
                      <p className="btn btn-outline btn-warning ss:p-6 ss:pb-9">
                        수락 대기중 . . .
                      </p>
                    </li>
                  ))}
                </>
              )
            : Array.isArray(receiveList) && (
                <>
                  <div className="flex justify-between mx-4 font-semibold">
                    <p>유저 이름</p>
                    <p className="mr-14">글 제목 </p>
                    <p></p>
                  </div>
                  {receiveList.map((list) => (
                    <li
                      key={list.id}
                      className="bg-white p-6 flex justify-between items-center gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
                    >
                      <div className="flex basis-40 items-center">
                        <img
                          src={sampleImageProfile || list.profileImage}
                          alt="Profile"
                          className="w-12 h-12 md:w-20 md:h-20 rounded-full mr-2 md:mr-4"
                        />
                        <div className="basis-20 ss:basis-40">
                          <p className="text-start text-sm md:text-base text-black font-semi-bold">
                            {list.nickname}
                          </p>
                          <p className="text-xs text-center ">{list.mbti}</p>
                        </div>
                      </div>
                      <p className="text-start font-semibold text-gray-500 basis-20 ss:basis-60  text-xs md:text-base mr-4 whitespace-nowrap overflow-hidden text-ellipsis">
                        {list.postTitle}
                      </p>

                      <div className="flex items-center">
                        <div className="flex justify-center gap-2 ">
                          <button
                            className="btn btn-outline btn-info bg-transparent text-blue-500 rounded text-sx p-3 ss:p-6 ss:pb-9"
                            onClick={() =>
                              handleApproveBtnClick(
                                list.id, //동행요청 고유 아이디
                                list.postId, // 게시글 id
                                list.requestMemberId, //요청 멤버 id
                              )
                            }
                          >
                            수락
                          </button>
                          <button
                            className="btn btn-outline btn-error bg-transparent text-red-500 rounded p-3 ss:p-6 ss:pb-9"
                            onClick={() => handleRejectBtnClick(list.id)}
                          >
                            거절
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
        </ul>
      </div>
    </main>
  );
};

export default TravelRequestList;
