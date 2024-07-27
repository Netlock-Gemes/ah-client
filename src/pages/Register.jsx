import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/6.jpg";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authContext from "../context/auth/authContext";

const Register = () => {
  const { setIsLogin, isLogin } = useContext(authContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match.", {
        autoClose: 2000,
      });
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      setCredentials({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      const data = await response.json();

      if (response.ok) {
        setIsLogin(true);
        localStorage.setItem("token", data.token);
        toast.success("Registration successful!", {
          autoClose: 2000,
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(data.msg || "Registration failed. Please try again.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.", {
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");

  const togglePass = () => {
    setShowPass(showPass === "password" ? "" : "password");
  };

  const toggleConfirmPass = () => {
    setShowConfirmPass(showConfirmPass === "password" ? "" : "password");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-8 pt-24"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer />
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Join Us
        </h1>
        <p className="text-center font-semibold text-gray-700 mb-4">
          Create an account to get started.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass}
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
                minLength={4}
              />
              <button
                type="button"
                onClick={togglePass}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPass === "password" ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPass}
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={onChange}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
                minLength={4}
              />
              <span
                onClick={toggleConfirmPass}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPass === "password" ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Registering..." : "Register"}
          </motion.button>
        </form>
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
