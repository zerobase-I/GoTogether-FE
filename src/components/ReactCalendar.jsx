import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';
import moment from 'moment';

//startDate / endDate 형식
// 2024-03-29T00:00:00'
const ReactCalendar = ({ onDateChange, startDate, endDate }) => {
  const today = new Date();
  const [date, setDate] = useState(today);

  const handleDateChange = (dates) => {
    setDate(dates);
    // 상위 컴포넌트에서 전달받은 함수를 실행하여 상위 state를 업데이트합니다.
    onDateChange(dates);
  };

  /* useEffect(() => {
    setDate(s);
  }, []); */

  useEffect(() => {
    if (startDate && endDate) {
      setDate(
        new Date(moment(startDate).format('YYYY,M,D')),
        new Date(moment(startDate).format('YYYY,M,D')),
      );
    } else {
      setDate(new Date());
    }
  }, []);

  // craetePost -> undefined
  // updatePost -> 이전 날짜 2024-03-28T00:00:00 2024-03-29T00:00:00 형식
  console.log(startDate, endDate);

  // craetePost 에서 Invalid date Invalid date
  //updatePost -> 2024,3,28 2024,3,28 형식
  console.log(
    moment(startDate).format('YYYY,M,D'),
    moment(startDate).format('YYYY,M,D'),
  );

  return (
    <section className="mb-6">
      <div className="mt-2 flex flex-col">
        <span className="text-xl w-full text-left font-semibold">
          날짜를 선택하세요
        </span>
        <div className="calendar-container mt-2">
          <Calendar
            onChange={handleDateChange}
            value={date}
            /* selectRange prop 활성화 -> 리액트 캘린더 반환값 : [시작날짜, 종료날짜] 배열반환 */
            formatDay={(locale, date) => moment(date).format('DD')} // 일 제거 숫자만 보이게
            formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
            formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
            calendarType={'gregory'} // 일요일 부터 시작
            //defaultValue={date}
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            selectRange={true} // 날짜 범위선택 가능
          />
        </div>
        {date.length > 0 ? (
          <p className="text-center mt-2">
            <span className="bold ">기존 여행 시작/종료 날짜:</span> {startDate}{' '}
            ~ {endDate}
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
            ~ {endDate}
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
