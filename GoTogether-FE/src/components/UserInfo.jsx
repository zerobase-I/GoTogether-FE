import React from 'react';
import { AiOutlineTrademark } from 'react-icons/ai';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { GiCrossMark } from 'react-icons/gi';
import { BiSolidAlarmExclamation } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  return (
    <section className="flex justify-between mb-2">
      <div className="flex items-end">
        <div className="avatar">
          <div className="w-40 rounded-full md:w-60">
            <Link to="/home/editprofile">
              <img src="https://i.namu.wiki/i/1L_8d7FSBchLDnx7zLaxWs-HvUa6wQzLy2trSu0fGIqjWYQDWjEIEyxxoNJyDaIq_FF1QKFsu8nMNpDbJn_QSQ.webp" />
            </Link>
          </div>
        </div>
        <div>
          <span className="text-xl self-start">홍길동</span>
          <div className="flex">
            <GiCrossMark className="text-2xl mr-2" />
            <Link to="/home/reviewdetail">
              <AiOutlineTrademark className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-end">
        <Link to="/home/alarm">
          <BiSolidAlarmExclamation className="text-2xl mr-2" />
        </Link>
        <Link to="/home/createpost">
          <HiOutlinePencilSquare className="text-2xl" />
        </Link>
      </div>
    </section>
  );
};

export default UserInfo;
