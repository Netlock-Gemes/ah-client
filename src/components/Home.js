import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PropertyCard from './PropertyCard';
import sampleProperties from '../constants/sampleProperties';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  const handleSearch = (query) => {
    const filtered = properties.filter((property) =>
      property.name.toLowerCase().includes(query.toLowerCase()) ||
      property.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Listings</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {filteredProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
