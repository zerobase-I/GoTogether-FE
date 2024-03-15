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
        const posts = response.data.list.filter(p => p.chatRoomId === chatRoomId);
        setPostDetails(posts[0] || {});
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
    <div className="sidebar bg-gray-500 w-64 h-full shadow-2xl">
      <div className="p-0">
        <div className="bg-gray-800 w-full h-20 flex justify-start items-center align-middle">
          <p className="text-white ml-5 text-xl">동행정보</p>
         <Link to={`/updatePostList/${chatRoomId}`}><img className="w-7 mb-1 ml-2" src="/src/assets/fixedDetail.png"/></Link>
        </div>
      </div>
      <div className="bg-gray-800 text-white w-60 m-auto rounded-md py-2 mt-2">{postDetails.startDate} ~ {postDetails.finishDate}</div>
      <div className="flex justify-center border-none outline-none">
        <div className="bg-gray-800 text-white w-28 rounded-md py-2 mt-2 outline-none border-none">{postDetails.travelCountry}</div>
        <div className="bg-gray-800 w-4 h-2 mt-6"></div>
        <div className="bg-gray-800 text-white w-28 rounded-md py-2 mt-2 outline-none border-none" >{postDetails.travelCity}</div>
      </div>
      <div className="bg-gray-800 text-white w-60 m-auto h-40 rounded-md mt-2">{postDetails.content}</div>
      {postDetails.category?.length > 0 && (
        <div className="bg-gray-800 w-60 m-auto h-36 rounded-md mt-2 grid grid-cols-2 gap-4 p-3">
          <div className="bg-blue-500 text-white rounded-lg py-1 flex justify-center items-center">{postDetails.category?.[0]}</div>
          <div className="bg-blue-500 text-white rounded-lg py-1 flex justify-center items-center">{postDetails.category?.[1]}</div>
          <div className="bg-blue-500 text-white rounded-lg py-1 flex justify-center items-center">{postDetails.category?.[2]}</div>
          <div className="bg-blue-500 text-white rounded-lg py-1 flex justify-center items-center">{postDetails.category?.[3]}</div>
        </div>
      )}
      <div className="bg-gray-800 text-white w-full h-10 mt-2 flex items-center">
        <p className="ml-5">참여자 목록</p>
      </div>
      <div className="bg-gray-300 w-full h-48">
        {participants.map(participant => (
          participant.nickname.map((name, index) => (
            <div key={`${participant.memberId}-${index}`} className="bg-gray-500 text-white h-9 items-center pl-5 shadow-lg mt-1 rounded-sm flex justify-between">
              {name}
            <Link to='/mypage'><img src="/src/assets/right-arrow-white.png" className=" w-4 ml-2 mr-7 " /></Link>  
              <div className="dropdown dropdown-bottom dropdown-end flex w-32 justify-end">
                <div tabIndex="0" role="button" className="text-black bg-transparent outline-none hover:bg-transparent border-none btn ">
                  <img src="/src/assets/memberMenu.png" className=" w-4 ml-2 " />
                </div>
                <ul tabIndex="0" className="dropdown-content text-black z-[1] menu p-1 shadow bg-base-100 rounded-box w-52">
                  <li><a>내보내기</a></li>
                </ul>
              </div>
            </div>
          ))
        ))}
      </div>

      <div className="bg-gray-800 text-white w-full h-10 flex items-center">
        <p className="ml-5">대기자 목록 </p>
      </div>
      <div className="bg-gray-300 w-full h-48">
        {waitingList.map(waiting => (
          <div key={waiting.id} className="bg-gray-500 text-white h-9 items-center pl-5 shadow-lg mt-1 align-middle rounded-sm flex justify-between">
            {waiting.requestMemberId} : {waiting.requestStatus}
            <img src="/src/assets/right-arrow-white.png" className=" w-4 ml-1 " />
            <div className="dropdown dropdown-bottom dropdown-end flex w-20 justify-end">
              <div tabIndex="0" role="button" className="text-black bg-transparent outline-none hover:bg-transparent border-none btn ">
                <img src="/src/assets/memberMenu.png" className=" w-4 ml-2 " />
              </div>
              <ul tabIndex="0" className="dropdown-content text-black z-[1] menu p-1 shadow bg-base-100 rounded-box w-52">
                <li><a>내보내기</a></li>
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ChatSideBar;