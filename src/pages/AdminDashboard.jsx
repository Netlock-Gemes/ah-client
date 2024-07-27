import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from '../components/UserList';
import PropertyList from '../components/PropertyList';
import AddPropertyForm from '../components/AddPropertyForm';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`${process.env.REACT_APP_HOST}/api/auth/user`, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        
        const userData = await userResponse.json();
        
        // Check if the user is an admin
        if (userData.role !== 'admin') {
          toast.error('Access denied. Admins only.');
          navigate('/');
        } else {
          const usersResponse = await fetch(`${process.env.REACT_APP_HOST}/api/auth/users`, {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          });
          const propertiesResponse = await fetch(`${process.env.REACT_APP_HOST}/api/properties/all`);
          
          const usersData = await usersResponse.json();
          const propertiesData = await propertiesResponse.json();
          
          setUsers(usersData);
          setProperties(propertiesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleAddProperty = async (newProperty) => {
    const formData = new FormData();
    Object.keys(newProperty).forEach(key => {
      if (key === 'images') {
        newProperty.images.forEach(file => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, newProperty[key]);
      }
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/properties/create`, {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
        body: formData
      });

      const data = await response.json();
      if (data._id) {
        setProperties([...properties, data]);
        toast.success('Property added successfully!');
      }
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Error adding property.');
    }
  };

  if (loading) {
    return <div className="flex min-h-screen justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-300 pt-20">
      <ToastContainer />
      <motion.div
        className="flex flex-col p-8 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h1>

        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <UserList users={users} setUsers={setUsers} /> {/* Pass setUsers here */}
          <PropertyList properties={properties} users={users} />
          <AddPropertyForm onAddProperty={handleAddProperty} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
