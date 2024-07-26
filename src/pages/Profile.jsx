import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/images/6.jpg'; // Add your background image here
import PropertyCard from '../components/PropertyCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/user`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch user failed:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center p-8 pt-32"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Profile</h1>
        <div className="space-y-4">
          <motion.div
            className="text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="block text-gray-700 font-semibold mb-1">Name:</label>
            <p className="p-2 rounded bg-gray-100">{user.name}</p>
          </motion.div>
          <motion.div
            className="text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-700 font-semibold mb-1">Email:</label>
            <p className="p-2 rounded bg-gray-100">{user.email}</p>
          </motion.div>
          <motion.div
            className="text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold mb-1">Role:</label>
            <p className="p-2 rounded bg-gray-100">{user.role}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Interested Properties Section */}
      <div className="w-full mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-60">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Interested Properties</h2>
          {user.interestedProperties && user.interestedProperties.length > 0 ? (
            <div className="flex flex-wrap md:mx-10 gap-5 mt-20 mb-10 justify-around">
              {user.interestedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-4">
              No interested properties found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
