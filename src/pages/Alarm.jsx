import React from 'react';
import AlarmBox from '../components/AlarmBox';

const Alarm = () => {
  return (
    <main>
      <h2 className="text-2xl mt-10">알림창 </h2>
      <AlarmBox />
      <AlarmBox />
      <AlarmBox />
      <AlarmBox />
    </main>
  );
};

export default Alarm;
