import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../src/styles/Calendar.css'; // css import
import moment from 'moment';

const ReactCalendar = ({ onDateChange, startDate, finishDate }) => {
  const [date, setDate] = useState(new Date());

  /*   const formattedSDate = moment(startDate, 'YY-MM-DD').format(
    'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (한국 표준시)',
  );
  const formattedFDate = moment(finishDate, 'YY-MM-DD').format(
    'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (한국 표준시)',
  ); */

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
            <span className="bold ">기존 여행 시작/종료 날짜:</span> {startDate}{' '}
            ~ {finishDate}
            <br />
            <span className="bold text-xl text-red-500 ">
              여행 시작 날짜:
            </span>{' '}
            <span className="text-red-500">
              {moment(date[0].toDateString()).format('L')}
            </span>{' '}
            <br />
            <span className="bold text-xl text-red-500">
              여행 종료 날짜:
            </span>{' '}
            <span className="text-red-500">
              {moment(date[1].toDateString()).format('L')}
            </span>
          </p>
        ) : (
          <p className="text-center">
            <span className="bold ">기존 여행 시작/종료 날짜:</span> {startDate}
            ~ {finishDate}
            <br />
            <span className="bold">오늘 날짜 : </span>{' '}
            {moment(date.toDateString()).format('MM-DD-YYYY')}
          </p>
        )}
      </div>
    </section>
  );
};

export default ReactCalendar;
