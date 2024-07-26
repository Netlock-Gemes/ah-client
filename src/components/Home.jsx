import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import PropertyCard from './PropertyCard';
import sampleProperties from '../constants/sampleProperties';
import Hero from './Hero';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const propertySectionRef = useRef(null); // Ref for scrolling

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

  const scrollToNextSection = () => {
    if (propertySectionRef.current) {
      propertySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col mx-auto bg-gray-300">
      <Hero scrollToNextSection={scrollToNextSection} />
      <div ref={propertySectionRef} className="pt-20 p-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">Property Listings</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
