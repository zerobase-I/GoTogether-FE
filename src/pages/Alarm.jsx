import React from 'react';
import AlarmBox from '../components/AlarmBox';
import useNotification from '../components/hooks/useNotification';
import Loading from '../components/Loading';

const Alarm = () => {
  const {
    inQuiryNotificationQuery: {
      data: notificationList,
      isLoading,
      isError,
      error,
    },
  } = useNotification();

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;
  console.log(notificationList);

  return (
    <main className="mb-40 mx-4 mt-4">
      <h2 className="text-2xl ">알림창 </h2>
      {notificationList?.map((list) => {
        return (
          <AlarmBox
            key={list.id}
            notificationId={list.id}
            postTitle={list.postTitle}
            postId={list.postId}
          />
        );
      })}
    </main>
  );
};

export default Alarm;
