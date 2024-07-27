import React, { useState, useEffect, useRef, useContext } from 'react';
import SearchBar from './SearchBar';
import PropertyCard from './PropertyCard';
import Hero from './Hero';
import authContext from '../context/auth/authContext';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const propertySectionRef = useRef(null);
  const { isLogin, checkLogin } = useContext(authContext);

  useEffect(() => {
    checkLogin();
  }, [isLogin]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/properties/all`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = (query) => {
    const filtered = properties.filter((property) =>
      property.title.toLowerCase().includes(query.toLowerCase()) ||
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
        <div className="flex flex-wrap md:mx-10 gap-5 mt-20 mb-10 justify-around">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
