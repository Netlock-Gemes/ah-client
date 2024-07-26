import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/6.jpg';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../context/auth/authContext';

const Login = () => {
    const { setIsLogin } = useContext(authContext);
    const [credentials, setCredetials] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredetials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            setCredetials({ email: "", password: "" });
            const data = await response.json();

            if (response.ok) {
                setIsLogin(true);
                localStorage.setItem('token', data.token);
                toast.success("Login successful!", {
                    autoClose: 2000,
                });
                setTimeout(() => navigate('/'), 2000);
            } else {
                toast.error(data.msg || "Login failed. Please try again.", {
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
    const togglePass = () => {
        if (showPass === "password") {
            setShowPass("");
        } else {
            setShowPass("password");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-8"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
                <ToastContainer />

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
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
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
                        transition={{ duration: 0.5, delay: 0.2 }}
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
                            />
                            <button type='button' onClick={togglePass} className="absolute right-3 top-3 cursor-pointer">
                                {showPass === "password" ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </motion.div>
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isLoading ? "Logging in..." : "Login"}
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
