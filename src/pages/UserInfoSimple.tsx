import { AiOutlineTrademark } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const UserInfoSimple = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="avatar">
          <div className="w-24 ml-10 mt-5 rounded-full">
            <img
              src="https://i.namu.wiki/i/1L_8d7FSBchLDnx7zLaxWs-HvUa6wQzLy2trSu0fGIqjWYQDWjEIEyxxoNJyDaIq_FF1QKFsu8nMNpDbJn_QSQ.webp"
              alt="Avatar"
            />
          </div>
        </div>

        <span className="text-xl ml-5 flex justify-start">홍길동</span>
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
