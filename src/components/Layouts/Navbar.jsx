import { IoHome } from 'react-icons/io5';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { MdPersonPin } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import styles from '../../style';

const Navbar = () => {
  return (
    <nav className="w-full btm-nav z-30  bg-gray-500 fixed bottom-0 mt-10">
      <NavLink
        to=""
        className={`${({ isActive }) => (isActive ? `active bg-red-500` : '')} ${styles.menuBtn}`}
      >
        <button type="button" className="w-full h-full hober:bg-red-700">
          <IoHome className="w-full text-2xl ss:text-4xl" />
        </button>
      </NavLink>

      <NavLink
        to="chatlist"
        className={`${({ isActive }) => (isActive ? 'active' : '')} ${styles.menuBtn}`}
      >
        <button type="button" className="w-full h-full hober:bg-red-700">
          <TbMessageCircle2Filled className="w-full  text-2xl ss:text-4xl" />
        </button>
      </NavLink>

      <NavLink
        to="mypage"
        className={`${({ isActive }) => (isActive ? 'active' : '')} ${styles.menuBtn}`}
      >
        <button type="button" className="w-full h-full hober:bg-red-700">
          <MdPersonPin className="w-full t text-2xl ss:text-4xl" />
        </button>
      </NavLink>

      <NavLink
        to="travelrequestlist"
        className={`${({ isActive }) => (isActive ? 'active' : '')} ${styles.menuBtn}`}
      >
        <button type="button" className="w-full h-full hober:bg-red-700">
          <IoIosPeople className="w-full text-2xl ss:text-4xl" />
        </button>
      </NavLink>
    </nav>
  );
};

export default Navbar;