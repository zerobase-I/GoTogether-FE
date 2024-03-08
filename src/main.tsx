import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
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
import FirstPage from './FirstPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <Home /> },
      { path: 'chatlist', element: <ChatList /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'travelrequestlist', element: <TravelRequestList /> },
      { path: 'postList', element: <PostList /> },
      { path: 'filter', element: <Filter /> },
      { path: 'createpost', element: <CreatePost /> },
      { path: 'chatroom', element: <ChatRoom /> },
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
