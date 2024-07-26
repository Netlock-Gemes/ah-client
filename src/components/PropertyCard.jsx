import React from "react";
import { motion } from "framer-motion";
import defaultImg from "../assets/images/2.jpg";

const PropertyCard = ({ property }) => {
  // Ensure the image URL is properly constructed or fallback to defaultImg
  const imageUrl =
    property.images && property.images.length > 0
      ? `${process.env.REACT_APP_HOST}/${property.images[0]}`
      : defaultImg;

  // Check if property.price is defined, otherwise default to 0
  const formattedPrice = property.price
    ? `₹${property.price.toLocaleString("en-IN")}`
    : "₹0";

  return (
    <motion.div
      className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col flex-wrap justify-between hover:shadow-teal-800 w-full md:w-[43%] lg:w-[23%]"
      whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
    >
      <img
        src={imageUrl}
        alt={property.title}
        className="w-full h-48 object-cover rounded-md mb-4 hover:scale-105 transition-all duration-300"
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {property.title}
        </h2>
        <p className="text-gray-600 mb-1">{property.location}</p>
        <p className="text-gray-800 font-semibold text-lg mb-4">
          {formattedPrice}
        </p>
        <p className="text-gray-600">{property.description}</p>
      </div>
      <motion.button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 "
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.95 }}
      >
        View Details
      </motion.button>
    </motion.div>
  );
};

export default PropertyCard;
