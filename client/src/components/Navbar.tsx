import React from "react";
// import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import Menu from './Menu';
// import Home from '../pages/Home';
// import Login from '../components/Login';
// import Signup from '../components/Signup';
// import Profile from '../pages/Profile';
// import Start from '../pages/Start';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {
 
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/home"
            >
              MASH GAME
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
                <div
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <Menu />
                  {/* <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">MENU</span> */}
                </div>
              </li>
            <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/home"
                >
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">GAME</span>
                </Link>
              </li>
            <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/login"
                >
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Log in</span>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="https://www.facebook.com/"
                >
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Facebook Share</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="https://twitter.com/"
                >
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Tweet</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="https://www.pinterest.com/"
                >
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Pinterest</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
);
};

export default Navbar;
