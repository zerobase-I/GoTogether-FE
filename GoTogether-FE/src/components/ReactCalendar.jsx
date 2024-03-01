import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../src/styles/Calendar.css'; // css import

const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="mt-2 flex flex-col">
      <span className="text-xl w-full text-left font-semibold">
        날짜를 선택하세요
      </span>
      <div className="calendar-container mt-2">
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
          calendarType={'gregory'}
        />
      </div>
      {date.length > 0 ? (
        <p className="text-center mt-2">
          <span className="bold ">여행 시작 날짜:</span>{' '}
          {date[0].toDateString()}
          <br />
          <span className="bold">여행 종료 날짜:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className="text-center">
          <span className="bold">오늘 날짜 : </span> {date.toDateString()}
        </p>
      )}
    </div>
  );
};

export default ReactCalendar;
