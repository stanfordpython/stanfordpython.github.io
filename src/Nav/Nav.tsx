import { Link, NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className="flex flex-row items-center">
        <Link to='/'>cs 41</Link>
      </div>
      <div className="flex flex-1"></div>
      <div className="flex flex-row justify-between items-center text-lg">
        <NavLink 
          to='/' 
          className={({ isActive }) => isActive ? "mr-3 text-white" : "mr-3 text-gray-300"}
        >
          home
        </NavLink>
        <NavLink 
          to='/lectures' 
          className={({ isActive }) => isActive ? "mr-3 text-white" : "mr-3 text-gray-300"}
        >
          lectures
        </NavLink>
        <NavLink 
          to='/assignments' 
          className={({ isActive }) => isActive ? "text-white" : "text-gray-300"}
        >
          assignments 
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;