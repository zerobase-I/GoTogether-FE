import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ChatSideBar = ({ chatRoomId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [participants, setParticipants] = useState([]);
  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
  try {
    const response = await axios.get(`/api/post/list/${chatRoomId}`);
    // 수정: 응답에서 filteredPosts 배열을 올바르게 추출
    if (response.data.filteredPosts && response.data.filteredPosts.length > 0) {
      setPostDetails(response.data.filteredPosts[0]);
    } else {
      setPostDetails({});
    }
  } catch (error) {
    console.error(`Error fetching post list:/${chatRoomId}`, error);
  }
};

    const fetchChatRoomMemberList = async () => {
      try {
        const response = await axios.get(`/api/chat-room/member-list/${chatRoomId}`);
        const filteredMembers = response.data.list.filter(member => member.chatRoomId === chatRoomId);
        setParticipants(filteredMembers || []);
      } catch (error) {
        console.error(`Error fetching chat room member list for room ${chatRoomId}:`, error);
      }
    };

    const fetchAccompanyRequest = async () => {
      try {
        const response = await axios.get('/api/accompany/request/receive');
        setWaitingList(response.data.waitingList || []);
      } catch (error) {
        console.error('Error fetching accompany request list:', error);
      }
    };

    fetchPostList();
    fetchChatRoomMemberList();
    fetchAccompanyRequest();
  }, [chatRoomId]);

  return (
  <div className="sidebar bg-gray-700 w-64 h-full shadow-xl overflow-auto">
    <div className="h-20 bg-gray-900 py-7 text-white text-center text-xl font-semibold">
      동행정보
    </div>
    <div className="mt-4 mx-4 p-4 bg-gray-800 text-white rounded-lg">
      <div className="text-center font-medium">{postDetails.startDate} ~ {postDetails.finishDate}</div>
      <div className="mt-4 flex justify-around items-center text-sm">
        <span className="px-3 py-1 bg-blue-500 rounded-full">{postDetails.travelCountry}</span>
        <span className="px-3 py-1 bg-blue-500 rounded-full">{postDetails.travelCity}</span>
      </div>
      <div className="mt-4 text-center font-light text-sm">
        {postDetails.content}
      </div>
      <div className="mt-4 text-center">
        <span className="px-3 py-1 bg-green-500 rounded-full text-xs">{postDetails.category}</span>
      </div>
    </div>
    
    <div className="mt-4 mx-4 p-4 bg-gray-800 text-white rounded-lg">
      <div className="font-medium">참여자 목록</div>
      <div className="mt-2 space-y-2">
        {participants.map(participant => (
          participant.nickname.map((name, index) => (
            <div key={`${participant.memberId}-${index}`} className="flex justify-between items-center p-2 bg-gray-700 rounded-lg">
              {name}
              <Link to='/mypage'><img src="/src/assets/right-arrow-white.png" className="w-4" /></Link>
            </div>
          ))
        ))}
      </div>
    </div>

    <div className="mt-4 mx-4 p-4 bg-gray-800 text-white rounded-lg">
      <div className="font-medium">대기자 목록</div>
      <div className="mt-2 space-y-2">
        {waitingList.map(waiting => (
          <div key={waiting.id} className="flex justify-between items-center p-2 bg-gray-700 rounded-lg">
            {waiting.requestMemberId} : {waiting.requestStatus}
            <img src="/src/assets/right-arrow-white.png" className="w-4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default ChatSideBar;