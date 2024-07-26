import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import authContext from "../context/auth/authContext";
import blankprofile from "../assets/images/blankprofile.jpg";
// import logo from '../assets/images/logo.png'; // Ensure you have a logo image

const dropdownVariants = {
  open: { opacity: 1, y: 0, display: "block" },
  closed: { opacity: 0, y: -20, transitionEnd: { display: "none" } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, setIsLogin, checkLogin } =
    useContext(authContext);

  useEffect(() => {
    checkLogin();
  }, [isLogin]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMenuClick = (menuOption) => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 p-4 fixed top-0 z-30 w-full shadow-md text-lg shadow-[#19384e]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src={logo} alt="A.H. Enterprises" className="h-10 w-10 mr-3" /> */}
          <Link to={'/'} className="text-white text-2xl font-bold">A.H. Enterprises</Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden absolute bg-gradient-to-r from-blue-700 to-indigo-700 w-full lg:w-auto top-16 left-0 lg:top-auto lg:left-auto p-4 lg:p-0`}
            >
              {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/"
                  className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
                >
                  Home
                </Link>
              </motion.div> */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/services"
                  className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
                >
                  Services
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/about-us"
                  className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
                >
                  About Us
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/experience"
                  className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
                >
                  Experience
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/contact"
                  className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
                >
                  Contact
                </Link>
              </motion.div>
              {isLogin ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      to="/profile"
                      className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
                    >
                      Profile
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <button
                      onClick={() => {
                        setIsLogin(false);
                        localStorage.clear();
                        handleMenuClick("Logout");
                      }}
                      className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <div>
                  <motion.div
                    whileTap={{ scale: 0.2 }}
                    className="transition duration-300 flex justify-center items-center px-3 py-1 rounded-full font-semibold hover:shadow-md bg-gradient-to-r from-blue-500 to-green-500 text-white mt-2 w-1/3"
                  >
                    <Link to="/login">Login</Link>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={`lg:flex lg:space-x-6 absolute lg:static w-full lg:w-auto top-16 left-0 lg:top-auto lg:left-auto p-4 lg:p-0 hidden items-center`}
        >
          {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
            >
              Home
            </Link>
          </motion.div> */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/services"
              className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
            >
              Services
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/about-us"
              className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
            >
              About Us
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/experience"
              className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
            >
              Experience
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/contact"
              className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
            >
              Contact
            </Link>
          </motion.div>

          {isLogin ? (
            <>
              {/* <span className="flex justify-center items-center font-semibold text-[#07E1E6]">
                {loggedInUserData.name}
              </span> */}
              <div className="relative mr-4">
                <img
                  src={blankprofile}
                  alt="profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  onClick={handleProfileClick}
                />
                <motion.div
                  ref={dropdownRef}
                  initial="closed"
                  animate={isDropdownOpen ? "open" : "closed"}
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-300 ring-1 ring-black ring-opacity-5"
                >
                  <div
                    className="p-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      to={"/profile"}
                      className="flex px-4 py-2 text-sm text-gray-700 hover:bg-white p-8 hoverLrounded-lg shadow-lg w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-70"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => handleMenuClick("Profile")}
                    >
                      Profile
                    </Link>
                    <button
                      className="flex px-4 py-2 text-sm text-gray-700 hover:bg-white p-8 hoverLrounded-lg shadow-lg w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-70"
                      onClick={() => {
                        setIsLogin(false);
                        localStorage.clear();
                        handleMenuClick("Logout");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          ) : (
            <motion.div
              className=" px-5 py-1 rounded-full font-semibold hover:shadow-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 text-white hover:text-gray-400 border border-gray-200 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to="/login"
                className="transition duration-300 block lg:inline-block mt-2 lg:mt-0"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
