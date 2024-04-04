import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ChatSideBar from '/src/components/chatSideBar.jsx';
import {reissueToken, fetchChatMessages } from '/src/api/chatService.js';
import axios from 'axios';
import * as Stomp from 'stomp-websocket';
import { UserInfoAtom } from '../recoil/userInfoAtom';
import { sampleImageProfile } from '/src/components/config/sampleImg';
import { useRecoilValue } from 'recoil';
// import { useQuery } from '@tanstack/react-query';

const ChatRoom = () => {
  const {profileImageUrl } = useRecoilValue(UserInfoAtom);
  const location = useLocation();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messageContainerRef = useRef(null);
  const { chatRoomId } = useParams(); // 채팅방 ID
  const { postId } = location.state || {};
  
  useEffect(() => {
  console.log("Chat Room ID: ", chatRoomId);
  }, [chatRoomId]);
  
  useEffect(() => {
  // profileImageUrl 상태가 변경될 때마다 콘솔에 출력
  console.log("Profile Image URL:", profileImageUrl);
}, [profileImageUrl]);

   useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || '';
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setUserDetails(JSON.parse(localStorage.getItem('userDetails')) || {});
   }, []);
  

   
   useEffect(() => {
  const tryConnectWebSocket = async () => {
    if (stompClient?.connected) return;

    const accessToken = localStorage.getItem('accessToken') || '';
    const wsUrl = `ws://gotogether.site/ws`;
    const client = Stomp.over(new WebSocket(wsUrl));

    client.connect({ 'Authorization': `Bearer ${accessToken}` }, () => {
      setStompClient(client);
      
      client.subscribe(`/exchange/chat.exchange/room.${chatRoomId}`, message => {
        const receivedMessage = JSON.parse(message.body);
        setMessages(prevMessages => {
          // 수신된 메시지의 ID가 현재 메시지 목록에 없을 경우에만 추가
          const messageExists = prevMessages.some(m => m.id === receivedMessage.id);
          if (!messageExists) {
            return [...prevMessages, receivedMessage];
          } else {
            return prevMessages; // 중복된 메시지는 추가하지 않음
          }
        });
      });
    }, async (error) => {
      // 에러 처리...
    });
  };
  tryConnectWebSocket();

 return () => {
    if (stompClient?.connected) {
      console.log('Disconnecting Stomp Client...');
      stompClient.disconnect(() => {
        console.log('Disconnected Stomp Client');
      });
    }
  };
}, [chatRoomId, stompClient]);// Dependency array to re-run the effect when chatRoomId or stompClient changes.
   


  useEffect(() => {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, []);

  

  const handleMessageSend = () => {
  if (!inputMessage.trim() || !stompClient) return;

  const messagePayload = {
    email: userDetails.email,
    nickname: userDetails.nickname,
    content: inputMessage,
    createdAt: new Date().toISOString(),
  };

  // 메시지를 서버에 전송
  stompClient.send(`/pub/chat/${chatRoomId}`, {}, JSON.stringify(messagePayload));
  
  // 입력 필드 초기화
  setInputMessage('');

  // 메시지 전송 후, 최신 메시지를 데이터베이스에서 로드
  loadLatestMessages();
};

// 데이터베이스에서 최신 메시지를 로드하는 함수
const loadLatestMessages = async () => {
  try {
    const fetchedMessages = await fetchChatMessages(localStorage.getItem('accessToken'), chatRoomId);
    setMessages(fetchedMessages);
  } catch (error) {
    console.error('Failed to fetch chat messages:', error);
  }
};

// useEffect 내에 존재하는 loadChatMessages 호출 부분을 loadLatestMessages로 변경
useEffect(() => {
  if (chatRoomId) {
    loadLatestMessages();
  }
}, [chatRoomId]);

  const handleInputChange = (e) => setInputMessage(e.target.value);

 


  const formatTime = (dateString) => {
  // 서버로부터 받은 ISO 문자열을 Date 객체로 변환
  const date = new Date(dateString);
  // 로컬 시간대로 시간을 포맷팅하지만, 서버 시간대를 기준으로 한 것으로 간주
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};



  /////////////////////////////////////////////////////////////////////////////////////////////
  
  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (isMenuOpen) {
        sidebar.classList.remove('right-[-100%]');
        sidebar.classList.add('right-0');
      } else {
        sidebar.classList.remove('right-0');
        sidebar.classList.add('right-[-100%]');
      }
    }
  }, [isMenuOpen]);

 
  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex flex-col h-screen">
           <button
        id="toggleButton"
        onClick={handleButtonClick}
        className={`fixed top-4 z-50 text-4xl px-3 py-1 rounded-full text-white ${isMenuOpen ? 'right-48' : 'right-4'} transition-all ease-in-out duration-200`}
      >
        {isMenuOpen ? 'x' : '='}
      </button>
      <div id="messageContainer" className="flex-1 pb-36 p-4 overflow-y-auto">
        <div className="py-3 px-3 bg-slate-400 rounded-xl">채팅방에 입장하셨습니다.</div>
        {messages.map((message, index) => (
  <div key={index} className={`mb-2 flex ${message.email === userDetails.email ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-xl ${message.email === userDetails.email ? 'items-end' : ''}`}>
              {message.email === userDetails.email ? (
                <div className="flex">
                  
                  <div className="flex flex-col items-end">
                    <div className="flex justify-start">{message.nickname}</div>
                    <div className="flex items-end">
                      <div className="text-xs mr-2">{formatTime(message.createdAt)}</div>
                      <div className={`p-3 rounded-lg max-w-72 shadow bg-blue-100`}>
                        {message.content}
                      </div>
                    </div> 
                  </div>
                  <img className="rounded-full ml-2 mt-4 h-14 w-14" src={profileImageUrl || sampleImageProfile} alt="profileImg"/>
                </div>
      ) : (
                  // 상대방 메시지일 경우
                  <div className="flex">
                    <img className="rounded-full mr-2 mt-7 h-10 w-14" src={profileImageUrl || sampleImageProfile} alt="profileImg"/>
                      <div className="flex flex-col items-start">
                        <div className="flex justify-start">{message.nickname}</div>
                        <div className="flex items-end">
                          <div className={`p-3 rounded-lg text-start shadow bg-gray-100`}>
                            {message.content}
                          </div>
                          <div className="text-xs ml-2">{formatTime(message.createdAt)}</div>
                        </div>
                      </div>
                  </div>
      )}
    </div>
  </div>
))}
      </div>

      <div className="p-2 z-10 bg-white border-t border-gray-200 fixed inset-x-0 bottom-16">
        <div className="flex items-center">

          <div className="relative">
            <div id="sidebar" className="fixed h-full top-0 outline-none right-[-100%] shadow-2xl bg-sky-100 w-64 rounded-lg transition-all duration-300 ease-in-out overflow-y-auto">
              <ChatSideBar chatRoomId={chatRoomId} postId={postId} />
            </div>
          </div>

          <textarea 
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 mr-2 border rounded-lg focus:outline-none resize-none"
            rows={1}
          />
          <button onClick={handleMessageSend} className="px-4 py-2 text-white bg-blue-500 rounded-lg">
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;