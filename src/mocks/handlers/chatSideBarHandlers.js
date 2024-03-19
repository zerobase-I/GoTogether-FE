import { http, HttpResponse } from 'msw';
import postData from '../postDummy.json';

let allPosts = postData;

const chatPostList = http.get('/api/post/list/:chatRoomId', (req, res, ctx) => {
    const { chatRoomId } = req.params;
    
    // chatRoomId에 해당하는 포스트만 필터링
    const filteredPosts = postData.filter(post => post.chatRoomId === chatRoomId);
    
  return HttpResponse.json({ filteredPosts });
})



 const chatMemberList = http.get('/api/chat-room/member-list/:chatRoomId', async() => {
    const memberList = [
      {
            memberId: 0,
          chatRoomId: '0', 
        nickname: ['박민서','신상우'] ,
        profileImageUrl: "/src/assets/profileImage.png"
      },
      {
          memberId: 1,
          chatRoomId: '1',
        nickname: ['person1', 'person2'],
        profileImageUrl: "/src/assets/profileImage.png"
        },
      {
          memberId: 2,
          chatRoomId: '2',
        nickname: ['person3', 'person4'],
        profileImageUrl: "/src/assets/profileImage.png"
        },
      {
          memberId: 3,
          chatRoomId: '3',
        nickname: ['person5', 'person6'],
        profileImageUrl: "/src/assets/profileImage.png"
      }
    ];

    return HttpResponse.json({ list: memberList });
  })

  const chatWaitingList = http.get('/api/accompany/request/receive', async() => {
    const waitingList = [
      {
        id: 1,
        requestMemberId: "이정우",
        requestStatus: "대기중",
        createdAt: "2024-01-01T12:04:11"
      }
    ];

      return HttpResponse.json({ waitingList });
  })

export const ChatSideHandlers = [
    chatPostList,
    chatMemberList,
    chatWaitingList
  ]