import React from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:gap-0 gap-8">
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold md:mb-4">A.H. Enterprises</h2>
            <p className="text-gray-400">
              Your trusted real estate consultant, helping you find your dream property.
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold md:mb-4">Quick Links</h2>
            <ul>
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/about-us" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/experience" className="text-gray-400 hover:text-white">Experience</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold md:mb-4">Contact Us</h2>
            <p className="text-gray-400">123 Main Street, Downtown, Mumbai</p>
            <p className="text-gray-400">Phone: +91 98765 43210</p>
            <p className="text-gray-400">Email: info@ahenterprises.com</p>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold md:mb-4 mb-1">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebookSquare className='h-7 w-7' />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaSquareXTwitter className="h-7 w-7" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
              <FaLinkedin className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          © 2024 A.H. Enterprises. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
