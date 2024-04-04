import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPostDetails, fetchChatRoomMemberList,fetchMainSchedule } from '/src/api/sideBar.js';
import { useParams,useNavigate } from 'react-router-dom';
import { exitChatRoom } from '/src/api/chatroom.js';


const ChatSideBar = ({chatRoomId, postId}) => {
  const [postDetails, setPostDetails] = useState({});
  const [participants, setParticipants] = useState([]);
  const [mainScheduleContent, setMainScheduleContent] = useState('');
  const navigate = useNavigate();

const handleExitChatRoom = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    // confirm을 사용하여 사용자의 의사를 확인
    const isConfirmed = confirm('채팅방에서 퇴장하시겠습니까?');
    if (isConfirmed) {
      try {
        await exitChatRoom(accessToken, chatRoomId);
        alert('채팅방에서 퇴장했습니다.');
        navigate('/chatlist'); // 채팅방 목록 페이지로 이동
      } catch (error) {
        alert('채팅방 퇴장에 실패했습니다.');
        console.error('Chat room exit failed:', error);
      }
    }
  };
  
  useEffect(() => {
    console.log("chatRoomId:", chatRoomId);
    console.log("postId:", postId);
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const postDetailsData = await fetchPostDetails(postId);
        setPostDetails({
          travelCountry: postDetailsData.travelCountry,
          travelCity: postDetailsData.travelCity,
          startDate: formatDate(postDetailsData.startDate),
          finishDate: formatDate(postDetailsData.endDate),
          category: postDetailsData.postCategory,
          content: postDetailsData.content,
        });
        console.log('여행정보', postDetailsData);

        const participantsData = await fetchChatRoomMemberList(accessToken, chatRoomId);
        if (participantsData && participantsData.length > 0) {
          const nickNames = participantsData.map(member => member.nickName);
          setParticipants(nickNames);
        } else {
          setParticipants([]);
        }

          const mainScheduleData = await fetchMainSchedule(postId);
        console.log('주요 일정 데이터:', mainScheduleData);
        if (mainScheduleData) {
          setMainScheduleContent(mainScheduleData.content);
        } else {
          setMainScheduleContent('');
        }
      } catch (error) {
        console.error('Failed to fetch sidebar data:', error);
      }
    };

    fetchData();
  }, [chatRoomId, postId]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  }

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
        <div className="font-medium">주요 일정</div>
        <div className="bg-gray-700 rounded-xl text-left min-h-40 px-1 py-3 overflow-auto">{postDetails.content}</div>
      </div>
    
        <div className="mt-10 mb-10 text-center">
          <span className="px-6 py-4 bg-orange-500 rounded-full text-xs">{postDetails.category}</span>
        </div>
      </div>

      <div className="mt-4 mx-4 p-4 bg-gray-800 text-white rounded-lg">
        <div className="font-medium">참여자 목록</div>
        <div className="mt-2 space-y-2">
          {participants.length > 0 ? (
            participants.map((nickName, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-700 rounded-lg">
                {nickName}
                <Link to={`/mypage/${participants.memberId}`}><img src="/src/assets/right-arrow-white.png" className="w-4" alt="Profile" /></Link>
              </div>
            ))
          ) : (
            <div>참여자 정보를 불러오는 중...</div>
          )}
        </div>
      </div>

      <div className="absolute bottom-20 right-16">
        <button
          onClick={handleExitChatRoom}
        className="w-full py-2 px-8 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out">
        퇴장하기
            </button>
      </div>
      
    </div>
  );
};

export default ChatSideBar;