import { AiOutlineTrademark } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../recoil/userInfoAtom';
import { sampleImageProfile } from '../components/config/sampleImg';

const UserInfoSimple = () => {
  const { name, profileImageUrl } = useRecoilValue(UserInfoAtom);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="avatar">
          <div className="w-24 ml-10 mt-5 rounded-full">
            <img src={profileImageUrl || sampleImageProfile} alt="Avatar" />
          </div>
        </div>

        <span className="text-xl ml-5 flex justify-start">{name}</span>
      </div>

      <div className="flex justify-end pr-10 w-1/4">
        <div className="flex">
          <Link to="/reviewdetail">
            <AiOutlineTrademark className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSimple;
