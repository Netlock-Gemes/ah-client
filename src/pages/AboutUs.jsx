import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import img1 from '../assets/images/4.jpg';
import img2 from '../assets/images/12.jpg';

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  zoomIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
};

const AboutUs = () => {
  return (
    <div className="bg-gray-200">
      {/* Hero Section */}
      <div className="bg-cover bg-center" style={{ backgroundImage: `url(${img1})` }}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={animationVariants.slideUp}
          viewport={{ once: true }}
          className="flex flex-col w-full h-full mx-auto px-6 text-center text-white bg-gray-700/60 pt-32 pb-24"
        >
          <h1 className="text-5xl font-bold mb-4">Who We Are</h1>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            At [Your Company Name], our mission is to deliver innovative real estate solutions tailored to meet the unique needs of each client.
          </p>
          <div className="flex justify-center gap-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold">19K+</h2>
              <p className="text-lg mt-2">Premium Properties</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">5000+</h2>
              <p className="text-lg mt-2">Satisfied Clients</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* What We Offer Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={animationVariants.fadeIn}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-4">What We Offer</h1>
            <a href="/services" className="bg-blue-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-blue-700 transition duration-300">Explore Services</a>
          </div>
          <div>
            <img
              src={img2}
              alt="Our Services"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Instant Property Valuation</h2>
            <p>Receive a free, no-obligation property valuation from our experts.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Property Preparation</h2>
            <p>Get your property ready for sale with our comprehensive preparation services.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Offer Management</h2>
            <p>We manage offers to ensure you get the best deal for your property.</p>
          </div>
        </div>
      </div>

      {/* Key Stats Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial="initial"
            animate="animate"
            variants={animationVariants.fadeIn}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl font-bold mb-4">Our Achievements</h1>
            <p className="text-lg mb-4">
              Since our founding in 1995, we have established a strong reputation for delivering outstanding results in the real estate market.
            </p>
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={animationVariants.zoomIn}
            viewport={{ once: true }}
            className="md:w-1/2 text-center"
          >
            <h2 className="text-6xl font-bold text-blue-300">200+</h2>
            <p className="text-lg">Successful Projects</p>
          </motion.div>
        </div>
      </div>

      {/* We Focus Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={animationVariants.fadeIn}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div>
            <img
              src={img1}
              alt="Our Focus"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-5xl font-bold mb-4">We Specialize in Diverse Real Estate Sectors</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                initial="initial"
                animate="animate"
                variants={animationVariants.zoomIn}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-blue-600">Residential</h2>
                <p>We offer expert services in buying, selling, and managing residential properties.</p>
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                variants={animationVariants.zoomIn}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-blue-600">Commercial</h2>
                <p>Our team provides comprehensive solutions for commercial real estate transactions.</p>
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                variants={animationVariants.zoomIn}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-blue-600">Industrial</h2>
                <p>We handle all aspects of industrial real estate, including leasing and sales.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-cover bg-center text-white" style={{ backgroundImage: `url(${img2})` }}>
        <div className="flex w-full h-full py-16 mx-auto px-16 justify-center items-center text-center bg-blue-900/70">
          <motion.div
            initial="initial"
            animate="animate"
            variants={animationVariants.fadeIn}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl mb-6">
              Creating Value Across the <span className="text-blue-300">Real Estate Spectrum</span>
            </h1>
            <div className="flex flex-col gap-6 items-center">
              <div className="flex justify-between items-center border-b-2 border-white pb-4 text-xl">
                <h2>Investment Management</h2>
                <a href="/services" className="text-blue-300">
                  <FaArrowRight className="rotate-45" />
                </a>
              </div>
              {/* Repeat the above div for additional items */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Appreciation Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial="initial"
            animate="animate"
            variants={animationVariants.fadeIn}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl font-bold mb-4">Our Commitment to Appreciation</h1>
            <p className="text-xl mb-6">
              We leverage real estate to support and grow impactful projects around the globe.
            </p>
            <a href="/contact" className="bg-blue-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-blue-700 transition duration-300">
              Contact Us
            </a>
          </motion.div>
          <div className="flex justify-center items-center">
            <img
              src={img1}
              alt="Appreciation"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
