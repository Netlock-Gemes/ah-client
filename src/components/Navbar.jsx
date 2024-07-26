import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import logo from '../assets/images/logo.png'; // Ensure you have a logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 p-4 fixed top-0 z-30 w-full shadow-md text-lg shadow-[#19384e]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src={logo} alt="A.H. Enterprises" className="h-10 w-10 mr-3" /> */}
          <h1 className="text-white text-2xl font-bold">A.H. Enterprises</h1>
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
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/"
                  className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
                >
                  Home
                </Link>
              </motion.div>
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
              <div>
                <motion.div
                  whileTap={{ scale: 0.2 }}
                  className="transition duration-300 flex justify-center items-center px-3 py-1 rounded-full font-semibold hover:shadow-md bg-gradient-to-r from-blue-500 to-green-500 text-white mt-2 w-1/3"
                >
                  <Link to="/login">Login</Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={`lg:flex lg:space-x-6 absolute lg:static w-full lg:w-auto top-16 left-0 lg:top-auto lg:left-auto p-4 lg:p-0 hidden items-center`}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition duration-300 block lg:inline-block mt-2 lg:mt-0"
            >
              Home
            </Link>
          </motion.div>
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
          <motion.div
            className=" px-5 py-1 rounded-full font-semibold hover:shadow-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 text-white hover:text-gray-400 border border-gray-200"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
