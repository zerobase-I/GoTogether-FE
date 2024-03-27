import React, { useEffect, useState, useRef,useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ChatSideBar from '/src/components/chatSideBar.jsx';
import {reissueToken, fetchChatMessages } from '/src/api/chatService.js';
import axios from 'axios';
import * as Stomp from 'stomp-websocket';
// import { useQuery } from '@tanstack/react-query';

const ChatRoom = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messageContainerRef = useRef(null);
  const { chatRoomId } = useParams(); // 채팅방 ID
  
  useEffect(() => {
  console.log("Chat Room ID: ", chatRoomId);
}, [chatRoomId]);

   useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || '';
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setUserDetails(JSON.parse(localStorage.getItem('userDetails')) || {});
   }, []);
  
    useEffect(() => {
  if (chatRoomId) { // chatRoomId가 유효한 값인 경우에만 실행
    const loadChatMessages = async () => {
      try {
        const fetchedMessages = await fetchChatMessages(localStorage.getItem('accessToken'), chatRoomId);
        if (Array.isArray(fetchedMessages)) {
          setMessages(fetchedMessages);
        } else {
          console.error('Fetched data is not an array:', fetchedMessages);
          setMessages([]); // 데이터 형태가 배열이 아니면 빈 배열로 설정
        }
      } catch (error) {
        console.error('Failed to fetch chat messages:', error);
      }
    };
    loadChatMessages();
  }
}, []);
    
   useEffect(() => {
    const tryConnectWebSocket = async () => {
      if (stompClient?.connected) return;

      const accessToken = localStorage.getItem('accessToken') || '';
      const wsUrl = `ws://gotogether.site/ws`;
      const client = Stomp.over(new WebSocket(wsUrl));

      client.connect(
        { 'Authorization': `Bearer ${accessToken}` },
        () => {
          setStompClient(client);
          const subscription = client.subscribe(`/exchange/chat.exchange/room.${chatRoomId}`, message => {
            const receivedMessage = JSON.parse(message.body);
            // 현재 사용자가 보낸 메시지는 화면에 다시 추가하지 않음
            if (receivedMessage.email === userDetails.email && receivedMessage.createdAt && messages.find(m => m.createdAt === receivedMessage.createdAt)) {
              setMessages(prevMessages => [...prevMessages, receivedMessage]);
            }
          });
          return () => subscription.unsubscribe();
        },
        async (error) => {
         if (error.headers?.message === 'Expired Token') {
            const newAccessToken = await reissueToken(localStorage.getItem('refreshToken'));
            localStorage.setItem('accessToken', newAccessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            tryConnectWebSocket(); // 재시도
          }
        }
      );
    };
    tryConnectWebSocket();

    return () => stompClient?.disconnect();
  }, []);// Dependency array to re-run the effect when chatRoomId or stompClient changes.
   


  useEffect(() => {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, []);

  

  const handleMessageSend = () => {
    if (!inputMessage.trim() || !stompClient) return;

  const createdAt = new Date().toISOString();
const messagePayload = {
  email: userDetails.email,
  content: inputMessage,
  createdAt, // ISO 8601 형식의 문자열
};

    stompClient.send(`/pub/chat/${chatRoomId}`, {}, JSON.stringify(messagePayload));
    setInputMessage(''); // 입력 필드 초기화
    setMessages(prevMessages => [...prevMessages, {...messagePayload, id: createdAt}]);
  };

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
  useEffect(() => {
    const toggleButton = document.getElementById('toggleButton');
    const sidebar = document.getElementById('sidebar');

    const handleButtonClick = () => {
      // 사이드바가 화면 왼쪽 바깥에 있는지 확인하여 조건부로 클래스를 토글합니다.
      if (sidebar.classList.contains('right-[-100%]')) {
        // 사이드바를 화면으로 슬라이드 시킵니다.
        sidebar.classList.remove('right-[-100%]');
        sidebar.classList.add('right-0');
      } else {
        // 사이드바를 화면 왼쪽 바깥으로 슬라이드 시킵니다.
        sidebar.classList.remove('right-0');
        sidebar.classList.add('right-[-100%]');
      }
    };

    toggleButton.addEventListener('click', handleButtonClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
    return () => {
      toggleButton.removeEventListener('click', handleButtonClick);
    };
  }, []);

  
  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex flex-col h-screen">
      <div id="messageContainer" className="flex-1 pb-36 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 flex ${message.email === userDetails.email ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl flex items-end ${message.email === userDetails.email ? 'justify-end' : ''}`}>
              <div className="flex-col">
                <div className="flex justify-end">{message.nickname}</div>
                  <div className="flex items-end">
                    <div className="text-xs mr-2">{formatTime(message.createdAt)}</div>
                    <div className={`p-3 rounded-lg shadow ${message.email === userDetails.email ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.content}
                    </div>
                </div>
              </div>  
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 z-10 bg-white border-t border-gray-200 fixed inset-x-0 bottom-16">
        <div className="flex items-center">

          <div className="relative">
            <button id="toggleButton" className="bg-blue-500 text-white px-3 py-1 mr-1 rounded-full">
              +
            </button>
            <div id="sidebar" className="fixed h-full top-0 outline-none right-[-100%] shadow-2xl bg-sky-100 w-64 rounded-lg transition-all duration-300 ease-in-out overflow-y-auto">
              <ChatSideBar chatRoomId={chatRoomId} />
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