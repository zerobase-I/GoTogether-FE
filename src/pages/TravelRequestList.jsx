import React, { useState } from 'react';

const TravelRequestList = () => {
  // 예시로 사용자 데이터를 하드코딩합니다.
  const [activeTab, setActiveTab] = useState('send');

  const requests = [
    { id: 1, profilePic: 'https://via.placeholder.com/50', nickname: 'User 1', type: 'send' },
    { id: 2, profilePic: 'https://via.placeholder.com/50', nickname: 'User 2', type: 'received' },
    { id: 3, profilePic: 'https://via.placeholder.com/50', nickname: 'User 3', type: 'send' },
    { id: 4, profilePic: 'https://via.placeholder.com/50', nickname: 'User 4', type: 'received' },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl bg-blue-400 w-64 m-auto rounded-md font-bold mb-4">동행 요청 내역</h1>
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
      <div className="grid grid-cols-1 gap-8">
        <ul className="space-y-4">
            {requests
              .filter(request => request.type === activeTab)
              .map(request => (
                <li key={request.id} className="bg-white p-4 flex justify-between gap-1 rounded-md align-middle shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out">
                  <img src={request.profilePic} alt="Profile" className="w-12 h-12 rounded-full" />
                  <p className="font-semibold mr-36">{request.nickname}</p>
                  {activeTab === 'received' ? (
                    <div className="flex items-center">
                      <div className="flex justify-center gap-5 pb-2">
                        <button className="bg-transparent text-blue-500 rounded">수락</button>
                        <button className="bg-transparent text-blue-500 rounded">거절</button>
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