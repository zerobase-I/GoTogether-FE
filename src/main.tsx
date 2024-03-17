import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Auth from './pages/Auth.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';
import ChatList from './pages/ChatList.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TravelRequestList from './pages/TravelRequestList.jsx';
import Home from './pages/Home.jsx';
import Setting from './pages/Setting.jsx';
import MyPage from './pages/MyPage.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Alarm from './pages/Alarm.jsx';
import ReviewDetail from './pages/ReviewDetail.jsx';
import PostList from './pages/PostList.jsx';
import Filter from './pages/Filter.jsx';
import ChatRoom from './pages/ChatRoom.jsx';
import EditProfile from './pages/EditProfile.jsx';
import Review from './pages/Review.jsx';
import Login from './pages/Login.jsx';
import UpdatePostList from './pages/UpdatePostList.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import FirstPage from './routes/FirstPage.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import App from './routes/App.js';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browsers');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { path: '', element: <Home /> },
      { path: '', element: <Home /> },
      { path: 'chatlist', element: <ChatList /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'travelrequestlist', element: <TravelRequestList /> },
      { path: 'postLists/:id', element: <PostList /> },
      { path: 'updatePostList/:id', element: <UpdatePostList /> },
      { path: 'filter', element: <Filter /> },
      { path: 'createpost', element: <CreatePost /> },
      { path: 'chatroom/:id', element: <ChatRoom /> },
      { path: 'editprofile', element: <EditProfile /> },
      { path: 'reviewdetail', element: <ReviewDetail /> },
      { path: 'alarm', element: <Alarm /> },
      { path: 'review', element: <Review /> },
      { path: 'settings', element: <Setting /> },
      { path: '*', element: <NotFound /> },
    ],
  },

  {
    path: 'member',
    element: <FirstPage />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <Auth /> },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);

enableMocking().then(() => {
  const queryClient = new QueryClient(); // QueryClient 생성

  // ReactDOM.createRoot로 앱을 렌더링하기 전에 QueryClientProvider로 감싸줍니다.
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </React.StrictMode>
    </RecoilRoot>,
  );
});
