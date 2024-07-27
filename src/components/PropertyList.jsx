import React, { useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import {
  FaHome,
  FaMapMarkerAlt,
  FaUsers,
  FaUser,
  FaRupeeSign,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import nothingImg from "../assets/images/nothing.png";

const PropertyList = ({ properties, users }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate(); // Hook for navigation
  const containerRef = useRef(null); // Ref for the container element

  const pageCount = Math.ceil(properties.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // Scroll to top of the property list container
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const currentItems = properties.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div
      className="flex flex-col w-full max-w-6xl min-h-[33rem] justify-between bg-white p-4 md:p-8 rounded-lg shadow-lg"
      ref={containerRef}
    >
      <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
        <FaHome className="text-green-600 text-2xl mr-3" /> Properties
      </h2>
      {properties.length === 0 ? (
        <div className="text-center flex flex-col justify-center items-center text-gray-600 py-8">
          <p className="text-lg">No property found</p>
          <img src={nothingImg} alt="nothing" className="h-60 w-60 my-10" />
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((property) => (
              <motion.div
                key={property._id}
                className="bg-green-50 p-6 rounded-lg shadow-lg flex flex-col justify-between border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col mb-4">
                  <h3 className="text-2xl font-semibold text-green-700 mb-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center mb-3">
                    <FaMapMarkerAlt className="text-green-600 text-lg mr-2" />
                    <p className="text-gray-800 text-md">{property.location}</p>
                  </div>
                  <div className="flex items-center mb-3">
                    <FaRupeeSign className="text-green-600 text-lg mr-2" />
                    <p className="text-gray-800 text-md">{property.price}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-green-600 text-lg mr-2" />
                    <p className="text-gray-800 text-md">
                      Interested Users: {property.interestedBy.length}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {property.interestedBy.map((userId) => {
                      const user = users.find((u) => u._id === userId);
                      return (
                        <div
                          key={userId}
                          className="flex items-center space-x-2 text-gray-700"
                        >
                          <FaUser className="text-gray-600 text-sm" />
                          <p className="text-sm">
                            {user ? user.name : "Unknown User"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  className="mt-4 py-2 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                  onClick={() => navigate(`/property/${property._id}`)} // Navigation logic
                >
                  View Details
                </button>
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
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              previousLinkClassName="flex items-center justify-center w-full h-full"
              nextClassName={`flex items-center justify-center w-20 h-8 border border-gray-300 rounded-lg ${
                currentPage === pageCount - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              nextLinkClassName="flex items-center justify-center w-full h-full"
              breakClassName="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-lg"
              breakLinkClassName="flex items-center justify-center w-full h-full text-gray-700"
              activeClassName="bg-green-600 text-white"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;
