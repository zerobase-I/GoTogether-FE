import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatSideBar from '/src/components/chatSideBar.jsx';

const ChatRoom = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messageContainerRef = useRef(null);
  const { id } = useParams(); // 채팅방 ID

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    // 오후 3:10 형식으로 포매팅
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(`chatMessages-${id}`)) || [];
    setMessages(storedMessages);

    // 웹소켓 URL 수정
    const wsUrl = `ws://localhost:8080/ws/chatRoom/${id}`;
    const webSocket = new WebSocket(wsUrl);

    webSocket.onopen = () => {
      setWs(webSocket);
      // 채팅방 입장 메시지 전송
      const enterMessage = {
        type: 'ENTER',
        chatRoomId: id,
        memberId: '사용자ID', // 사용자 식별 정보 (예시)
        message: '사용자닉네임이 채팅방에 입장했습니다.',
      };
      webSocket.send(JSON.stringify(enterMessage));
    };

    webSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      addMessage(receivedMessage.content, receivedMessage.author);
    };

    return () => {
      if (webSocket.readyState === WebSocket.OPEN) {
        // 채팅방 퇴장 메시지 전송
        const exitMessage = {
          type: 'EXIT',
          chatRoomId: id,
          memberId: '사용자ID', // 사용자 식별 정보 (예시)
          message: '사용자닉네임이 채팅방에서 퇴장했습니다.',
        };
        webSocket.send(JSON.stringify(exitMessage));
        webSocket.close();
      }
    };
  }, [id]);

  useEffect(() => {
    if (messageContainerRef.current) {
      const scroll = () => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      };
      setTimeout(scroll, 100);
    }
  }, [messages, id]);

  const addMessage = (text, author = 'me') => {
    setMessages((prevMessages) => {
      const newMessage = {
        text,
        author,
        timestamp: new Date().getTime(), // 메시지 전송 시간
      };
      const updatedMessages = [...prevMessages, newMessage];
      updatedMessages.sort((a, b) => a.timestamp - b.timestamp);
      localStorage.setItem(`chatMessages-${id}`, JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  const handleMessageSend = () => {
    if (ws && inputMessage.trim() !== '') {
      const messagePayload = {
        content: inputMessage,
        chatRoomId: id,
        // 추가적으로 필요한 메시지 속성들을 여기에 포함시킬 수 있습니다.
      };
      // 메시지 송신 형식 조정
      ws.send(JSON.stringify(messagePayload));
      setInputMessage('');
      addMessage(inputMessage); // 내가 보낸 채팅 렌더링
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

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

  return (
    <div className="flex flex-col h-screen">
      <div ref={messageContainerRef} className="flex-1 p-4 overflow-y-auto pt-8 pb-36">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 flex ${message.author === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-64 flex justify-end items-end">
              {/* 메시지 전송 시간 표시 */}
              {message.author === 'me' && (
                <span className="text-xs mr-2 w-32 flex justify-end">
                  {formatMessageTime(message.timestamp)}
                </span>
              )}
              <div className={`p-3 rounded-lg shadow ${message.author === 'me' ? 'bg-blue-100 text-left' : 'bg-gray-100 text-left'}`}>
                {message.text}
              </div>
              {/* 상대방 메시지의 경우 시간을 오른쪽에 표시 */}
              {message.author !== 'me' && (
                <span className={`text-xs ${message.author === 'me' ? 'ml-2' : 'mr-2'}`}>
                  {formatMessageTime(message.timestamp)}
                </span>
              )}
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
              <ChatSideBar chatRoomId={id} />
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
