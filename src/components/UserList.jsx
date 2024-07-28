import React, { useState, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";
import nothingImg from "../assets/images/nothing.png";
import { toast } from "react-toastify";
import authContext from "../context/auth/authContext";

const UserList = ({ users, setUsers, showConnectButton }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef(null);
  const { loggedInUserData } = useContext(authContext);

  const filteredUsers = users.filter(
    (user) => user._id !== loggedInUserData._id
  );

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const currentItems = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const toggleAdminStatus = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/auth/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        toast.success(`User role updated to ${newRole}!`);
      } else {
        toast.error(data.msg || "Failed to update user role.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Error updating user role.");
    }
  };

  return (
    <div
      className="flex flex-col w-full max-w-6xl bg-white md:p-8 p-4 rounded-lg shadow-lg"
      ref={containerRef}
    >
      <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
        <FaUser className="text-blue-600 text-2xl mr-3" /> Users
      </h2>
      {filteredUsers.length === 0 ? (
        <div className="text-center flex flex-col justify-center items-center text-gray-600 py-8">
          <p className="text-lg">No users found</p>
          <img src={nothingImg} alt="nothing" className="h-60 w-60 my-10" />
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((user) => (
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
                    <h3 className="text-xl font-semibold text-blue-700">
                      {user.name}
                    </h3>
                  </div>
                  <div className="flex items-center mb-3">
                    <FaEnvelope className="text-blue-600 text-lg mr-2" />
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  <div className="flex items-center mb-3">
                    <FaUserShield className="text-blue-600 text-lg mr-2" />
                    <p
                      className={`text-md ${
                        user.role === "admin"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {user.role === "admin" ? "Admin" : "User"}
                    </p>
                  </div>
                </div>
                {showConnectButton ? (
                  <button
                    className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => console.log(`Connect user ${user._id}`)}
                  >
                    Connect User
                  </button>
                ) : (
                  <button
                    className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => toggleAdminStatus(user._id, user.role)}
                  >
                    {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <ReactPaginate
              previousLabel={
                <span className="text-sm font-semibold">Previous</span>
              }
              nextLabel={<span className="text-sm font-semibold">Next</span>}
              breakLabel={<span className="text-sm font-semibold">...</span>}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName="flex space-x-2"
              pageClassName="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-lg"
              pageLinkClassName="flex items-center justify-center w-full h-full text-gray-700"
              previousClassName={`flex items-center justify-center w-20 h-8 border border-gray-300 rounded-lg ${
                currentPage === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              previousLinkClassName="flex items-center justify-center w-full h-full"
              nextClassName={`flex items-center justify-center w-20 h-8 border border-gray-300 rounded-lg ${
                currentPage === pageCount - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              nextLinkClassName="flex items-center justify-center w-full h-full"
              breakClassName="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-lg"
              breakLinkClassName="flex items-center justify-center w-full h-full text-gray-700"
              activeClassName="bg-blue-600 text-white"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
