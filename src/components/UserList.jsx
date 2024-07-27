import React, { useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { FaUser, FaEnvelope, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserList = ({ users }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef(null); // Ref for the container element

  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // Scroll to top of the user list container
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const currentItems = users.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const makeAdmin = (userId) => {
    // Implement logic to make a user an admin
    console.log(`Make user with ID ${userId} an admin.`);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl bg-white md:p-8 p-4 rounded-lg shadow-lg" ref={containerRef}>
      <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
        <FaUser className="text-blue-600 text-2xl mr-3" /> Users
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentItems.map(user => (
          <motion.div
            key={user._id}
            className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col mb-4">
              <div className="flex items-center mb-3">
                <FaUser className="text-blue-600 text-lg mr-2" />
                <h3 className="text-xl font-semibold text-blue-700">{user.name}</h3>
              </div>
              <div className="flex items-center mb-3">
                <FaEnvelope className="text-blue-600 text-lg mr-2" />
                <p className="text-gray-800">{user.email}</p>
              </div>
              <div className="flex items-center mb-3">
                <FaUserShield className="text-blue-600 text-lg mr-2" />
                <p className={`text-md ${user.role === 'admin' ? 'text-green-600' : 'text-gray-600'}`}>
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </p>
              </div>
            </div>
            <button
              className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              onClick={() => makeAdmin(user._id)}
            >
              {user.role === 'admin' ? 'Admin' : 'Make Admin'}
            </button>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <ReactPaginate
          previousLabel={<span className="text-sm font-semibold">Previous</span>}
          nextLabel={<span className="text-sm font-semibold">Next</span>}
          breakLabel={<span className="text-sm font-semibold">...</span>}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2"
          pageClassName="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-lg"
          pageLinkClassName="flex items-center justify-center w-full h-full text-gray-700"
          previousClassName={`flex items-center justify-center w-20 h-8 border border-gray-300 rounded-lg ${currentPage === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          previousLinkClassName="flex items-center justify-center w-full h-full"
          nextClassName={`flex items-center justify-center w-20 h-8 border border-gray-300 rounded-lg ${currentPage === pageCount - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          nextLinkClassName="flex items-center justify-center w-full h-full"
          breakClassName="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-lg"
          breakLinkClassName="flex items-center justify-center w-full h-full text-gray-700"
          activeClassName="bg-blue-600 text-white"
        />
      </div>
    </div>
  );
};

export default UserList;
