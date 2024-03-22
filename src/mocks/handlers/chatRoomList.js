import { http, HttpResponse, delay } from 'msw';

/* 
req 는 흔히 말하는 '요청'에 관한 역할을 처리한다.
res 는 응답을 리턴할 때 쓰이는 함수라고 볼 수 있다.
ctx 는 실제로 응답을 어떻게 처리할지 세세한 내용을 정해줄 수 있다.
*/
const chatRoomDto = [
  {
      "chatRoomId": 0,
      "postId": 0,
      "name": "서울",
      "status": "",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
    },
    {
      "chatRoomId": 1,
      "postId": 1,
      "name": "부산",
      "status": "",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
    },
    {
      "chatRoomId": 2,
      "postId": 2,
      "name": "미국",
      "status": "ACTIVE",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
    },
    {
      "chatRoomId": 3,
      "postId": 3,
      "name": "인천",
      "status": "ACTIVE",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
    },
    {
      "chatRoomId": 4,
      "postId": 4,
      "name": "강릉",
      "status": "ACTIVE",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
  },
    {
      "chatRoomId": 5,
      "postId": 5,
      "name": "제주도",
      "status": "ACTIVE",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
  },
    {
      "chatRoomId": 6,
      "postId": 6,
      "name": "강원도",
      "status": "ACTIVE",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
  },
    {
      "chatRoomId": 7,
      "postId": 7,
      "name": "센프란시스코",
      "status": "ACTIVE",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
  },
    {
      "chatRoomId": 8,
      "postId": 8,
      "name": "괌",
      "status": "ACTIVE",
      "imageUrls": [
        "/src/assets/GoTogetherLogo.png"
      ]
    }
];

let Data = chatRoomDto;



const getChatRoomList = http.get('/api/chat-room/my-list', async () => {
  let res = [...Data];

  await delay(1000);
  return HttpResponse.json(res);
});




const postChatRoomList = http.post('/api/chat-room/my-list', async ({ request }) => {
  const body = await request.json();
  const newPost = {
    name: newPost.name,
    status: newPost.status,
    imageUrls: newPost.imageUrls
};

  Data = [...Data, newPost];
  await delay(1000);
  return HttpResponse.json(newPost);
});

const getPlaceholderImage = http.get('/src/assets/GoTogetherLogo.png', async (req, res, ctx) => {
  // 여기에 이미지를 반환하는 로직을 작성합니다.
  // 실제 이미지 파일이 있는 경로로 응답해야 합니다.
});


const getIndexCSS = http.get('/src/index.css', async (req, res, ctx) => {
  // 여기에 응답을 구성할 수 있습니다.
  // 현재는 간단히 빈 응답을 반환합니다.
});


const getChatListJSX = http.get('/src/pages/ChatList.jsx', async (req, res, ctx) => {
  // 여기에 응답을 구성할 수 있습니다.
  // 현재는 간단히 빈 응답을 반환합니다.
});

export const chatRoomListHandlers = [getChatRoomList, postChatRoomList];
export const additionalHandlers = [getIndexCSS, getChatListJSX, getPlaceholderImage];