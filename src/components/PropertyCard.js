import React from 'react';
import img from '../assets/images/2.jpg'

const PropertyCard = ({ property }) => {

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img src={img} alt={property.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold">{property.name}</h2>
      <p className="text-gray-700">{property.location}</p>
      <p className="text-gray-700">₹{property.price.toLocaleString('en-IN')}</p>
      <p className="text-gray-700">{property.description}</p>
    </div>
  );
};

export default PropertyCard;
