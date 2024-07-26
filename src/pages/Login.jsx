import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/6.jpg'; // Add your background image here

const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Welcome Back</h1>
        <p className="text-center font-semibold text-gray-700 mb-4">
          Sign in to your account to continue.
        </p>
        <form className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
          <p className="mt-2">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
