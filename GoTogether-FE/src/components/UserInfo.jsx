import React from 'react';
import { AiOutlineTrademark } from 'react-icons/ai';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { GiCrossMark } from 'react-icons/gi';
import { BiSolidAlarmExclamation } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  return (
    <>
      <div className="avatar">
        <div className="w-32 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>

      <div className="flex flex-col justify-around w-4/6">
        <span className="text-xl self-start">홍길동</span>
        <div>
          <div className="flex justify-between ">
            <div className="flex">
              <GiCrossMark className="text-2xl mr-2" />
              <Link to="reviewdetail">
                <AiOutlineTrademark className="text-2xl" />
              </Link>
            </div>
            <div className="flex">
              <Link to="alarm">
                <BiSolidAlarmExclamation className="text-2xl mr-2" />
              </Link>
              <Link to="createpost">
                <HiOutlinePencilSquare className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
