import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../src/styles/Calendar.css'; // css import
import moment from 'moment';

const ReactCalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleCalendarChange = (dates) => {
    setDate(dates);
    // 상위 컴포넌트에서 전달받은 함수를 실행하여 상위 state를 업데이트합니다.
    onDateChange(dates);
  };

  return (
    <section className="mb-6">
      <div className="mt-2 flex flex-col">
        <span className="text-xl w-full text-left font-semibold">
          날짜를 선택하세요
        </span>
        <div className="calendar-container mt-2">
          <Calendar
            onChange={handleCalendarChange}
            value={date}
            /* selectRange prop 활성화 -> 리액트 캘린더 반환값 : [시작날짜, 종료날짜] 배열반환 */
            selectRange={true}
            calendarType={'gregory'}
            formatDay={(locale, date) => moment(date).format('DD')}
          />
        </div>
        {date.length > 0 ? (
          <p className="text-center mt-2">
            <span className="bold ">여행 시작 날짜:</span>{' '}
            {moment(date[0].toDateString()).format('L')}
            <br />
            <span className="bold">여행 종료 날짜:</span>{' '}
            {moment(date[1].toDateString()).format('L')}
          </p>
        ) : (
          <p className="text-center">
            <span className="bold">오늘 날짜 : </span>{' '}
            {moment(date.toDateString()).format('MM-DD-YYYY')}
          </p>
        )}
      </div>
    </section>
  );
};

export default ReactCalendar;
