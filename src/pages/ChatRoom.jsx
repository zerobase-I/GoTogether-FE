import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const ChatRoom = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // 클라이언트 측 WebSocket 서버 주소
    const wsUrl = 'ws://localhost:8080';

    // WebSocket 연결 생성
    const webSocket = new WebSocket(wsUrl);
    setWs(webSocket);

    // WebSocket 이벤트 핸들러 설정
    webSocket.onmessage = (event) => {
      const receivedMessage = event.data.toString(); // 버퍼를 문자열로 변환
      addMessage(receivedMessage);
    };

    // Local Storage에서 채팅 내용 불러오기
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }

    return () => {
      webSocket.close();
    };
  }, []);

  useEffect(() => {
    // 새로운 메시지가 도착할 때 자동으로 스크롤을 아래로 이동
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
    // Local Storage에 채팅 내용 저장
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleMessageSend = () => {
    if (ws && inputMessage.trim() !== '') {
      // 메시지 전송
      ws.send(inputMessage);
      setInputMessage('');
      addMessage(inputMessage); //내가 보낸 채팅을 렌더링
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputMessage(value);
  };

  return (
    <div className="flex flex-col max-h-screen">
      {/* 채팅 메시지 표시 */}
      <div ref={messageContainerRef} className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2 flex justify-end">
            <div className="flex justify-start"> {/* 텍스트를 왼쪽으로 정렬하는 부분 */}
              <div className="bg-blue-100 p-3 rounded-lg shadow max-w-80"> {/*채팅 말풍선 크기 조절 및 스타일링*/}
                {message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창 및 전송 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center p-2">
          <textarea
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-2 py-2 mr-2 border rounded-lg focus:outline-none resize-none select-text"
            rows={2} // 원하는 줄 수를 지정합니다.
          />
          <button onClick={handleMessageSend} className="bg-blue-500 text-white px-4 py-2 rounded-lg">전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;