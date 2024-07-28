import React from "react";
import { motion } from "framer-motion";
import img from "../assets/images/14.jpg";
import { FaAnglesDown } from "react-icons/fa6";
import logo1 from "../assets/images/logo1.png";

const Hero = ({ scrollToNextSection }) => {
  const backgroundImageUrl = `url(${img})`;

  return (
    <section
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: backgroundImageUrl }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-4 h-full">
        <motion.img
          src={logo1}
          alt="Company Logo"
          className="w-32 mb-6 h-auto bg-blue-400/60 rounded-full"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to A.H. Enterprises
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your trusted real estate consultant
        </motion.p>
        <motion.a
          onClick={scrollToNextSection}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button>Search Property</button>
        </motion.a>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-16 md:mb-4">
        <motion.a
          href="#property-listings"
          className="text-white animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <FaAnglesDown className="h-9 w-9" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
