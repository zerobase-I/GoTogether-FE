import { IoHome } from 'react-icons/io5';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { MdPersonPin } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import styles from '../../style';

const Navbar = () => {
  return (
    <nav className="w-full btm-nav z-30 bg-gradient-to-r from-gray-700 to-gray-900 fixed bottom-0 mt-10">
      <NavLink
        to=""
        className={`${styles.menuBtn}`}
      >
        {({ isActive }) => (
          <button type="button" className="w-full h-full">
            <IoHome className={`w-full text-2xl ss:text-4xl ${isActive ? '' : 'text-white'}`} />
          </button>
        )}
      </NavLink>

      <NavLink
        to="chatlist"
        className={`${styles.menuBtn}`}
      >
        {({ isActive }) => (
          <button type="button" className="w-full h-full">
            <TbMessageCircle2Filled className={`w-full text-2xl ss:text-4xl ${isActive ? '' : 'text-white'}`} />
          </button>
        )}
      </NavLink>

      <NavLink
        to="mypage"
        className={`${styles.menuBtn}`}
      >
        {({ isActive }) => (
          <button type="button" className="w-full h-full">
            <MdPersonPin className={`w-full text-2xl ss:text-4xl ${isActive ? '' : 'text-white'}`} />
          </button>
        )}
      </NavLink>

      <NavLink
        to="travelrequestlist"
        className={`${styles.menuBtn}`}
      >
        {({ isActive }) => (
          <button type="button" className="w-full h-full">
            <IoIosPeople className={`w-full text-2xl ss:text-4xl ${isActive ? '' : 'text-white'}`} />
          </button>
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;
