import { http,HttpResponse } from 'msw'; // 이는 기술적으로 잘못된 사용법입니다. 실제로는 'rest'를 사용해야 합니다.



const chatPostList = http.get('/api/post/list/:chatRoomId', async () => {
    const postDetail = [
        {
          detailId: 1,
          chatRoomId: '1',
          startDate: '23-03-05',
          finishDate: '23-03-08',
          travelCountry: 'Korea',
          travelCity: 'seoul',
          category: ['adventure', '', '', ''],
          content: '경복궁 여행 2박3일'
        },
        {
            detailId: 2,
            chatRoomId: '2',
            startDate: '23-03-07',
            finishDate: '23-03-10',
            travelCountry: 'Korea',
            travelCity:'busan',
            category: ['adventure', 'culture', 'treavel', 'food'],
            content: '부산 국밥여행 2박3일'
        },
        {
            detailId: 3,
            chatRoomId: '3',
            startDate: '23-03-15',
            finishDate: '23-03-24',
            travelCountry: 'America',
            travelCity:'newyork',
            category: ['adventure', 'culture', 'treavel', 'food'],
            content: '미국 햄버거 뿌시기 8박9일'
        },
        {
            detailId: 4,
            chatRoomId: '4',
            startDate: '23-03-06',
            finishDate: '23-03-07',
            travelCountry: 'Korea',
            travelCity:'incheon',
            category: ['adventure', 'culture', 'treavel', 'food'],
            content: '강화도 여행 1박2일'
        }
    ]
    return HttpResponse.json({list: postDetail}); // 배열 자체를 반환하도록 수정
});

 const chatMemberList = http.get('/api/chat-room/member-list/:chatRoomId', async() => {
    const memberList = [
      {
            memberId: 1,
          chatRoomId: '1', 
        nickname: ['박민서','신상우'] ,
        profileImageUrl: "/src/assets/profileImage.png"
      },
      {
          memberId: 2,
          chatRoomId: '2',
        nickname: ['person1', 'person2'],
        profileImageUrl: "/src/assets/profileImage.png"
        },
      {
          memberId: 3,
          chatRoomId: '3',
        nickname: ['person3', 'person4'],
        profileImageUrl: "/src/assets/profileImage.png"
        },
      {
          memberId: 4,
          chatRoomId: '4',
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