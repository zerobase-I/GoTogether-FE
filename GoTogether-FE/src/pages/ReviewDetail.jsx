import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineTrademark } from 'react-icons/ai';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BiSolidAlarmExclamation } from 'react-icons/bi';

const ReviewDetail = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="avatar">
          <div className="w-32 ml-10 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar" />
          </div>
        </div>
        <span className="text-xl flex justify-start">홍길동</span>
        <div className="flex justify-end pr-10 w-1/4">
          <div className="flex">
            <Link to="reviewdetail">
              <AiOutlineTrademark className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-300 mt-5">
        <p className="p-7 text-left">
          내가 받은 후기들이에요! 더 많은 후기와 점수를 받아<br/>동행 점수를 높여 신뢰를 얻어보세요!
        </p>
      </div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        {[5, 4, 7, 2, 4, 4, 9].map((count, index) => (
          <div key={index} className="p-3 flex gap-12">
            <div className="flex items-center gap-5 ml-12">
              <img src="/src/assets/reviewCount.png" className="w-10 transform scale-x-[-1] w-100" alt="Left Arrow" />
              <span className="text-xl ">{count}</span>
            </div>
            <div>
              <div className="bg-blue-300 w-48 p-4 rounded-md">리뷰 내용</div>
            </div>
          </div>
        ))}
      </div>
    </>
  ); 
};

export default ReviewDetail;