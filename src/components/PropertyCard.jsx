import React from 'react';
import { motion } from 'framer-motion';
import img from '../assets/images/2.jpg';

const PropertyCard = ({ property }) => {
  return (
    <motion.div 
      className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between hover:shadow-teal-800"
      whileHover={{ scale: 1.02 }}
    >
      <img src={img} alt={property.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{property.name}</h2>
        <p className="text-gray-600 mb-1">{property.location}</p>
        <p className="text-gray-800 font-semibold text-lg mb-4">₹{property.price.toLocaleString('en-IN')}</p>
        <p className="text-gray-600">{property.description}</p>
      </div>
      <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300">
        View Details
      </button>
    </motion.div>
  );
};

export default PropertyCard;
