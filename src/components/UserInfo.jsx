import React from 'react';
import { AiOutlineTrademark } from 'react-icons/ai';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { GiCrossMark } from 'react-icons/gi';
import { BiSolidAlarmExclamation } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { TbPencilSearch } from 'react-icons/tb';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../recoil/userInfoAtom';
import { sampleImageProfile } from './config/sampleImg';

const UserInfo = () => {
  const { nickname, profileImageUrl } = useRecoilValue(UserInfoAtom);

  return (
    <section className="flex justify-between mb-2">
      <div className="flex items-end">
        <div className="avatar">
          <div className="w-40 rounded-full md:w-60 relative">
            <Link to="/editprofile">
              <img src={profileImageUrl || sampleImageProfile} />
              <TbPencilSearch className="absolute top-28 right-8 md:absolute md:top-44 md:right-10 text-2xl" />
            </Link>
          </div>
        </div>
        <div>
          <span className="text-xl self-start">{nickname}</span>
          <div className="flex">
            <GiCrossMark className="text-2xl mr-2" />
            <Link to="/reviewdetail">
              <AiOutlineTrademark className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-end">
        <Link to="/alarm">
          <BiSolidAlarmExclamation className="text-2xl mr-2" />
        </Link>
        <Link to="/createpost">
          <HiOutlinePencilSquare className="text-2xl" />
        </Link>
      </div>
    </section>
  );
};

export default UserInfo;
