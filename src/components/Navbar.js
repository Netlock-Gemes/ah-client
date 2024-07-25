import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">A.H. Enterprises</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/services" className="text-white">Services</Link>
          <Link to="/about-us" className="text-white">About Us</Link>
          <Link to="/experience" className="text-white">Experience</Link>
          <Link to="/contact" className="text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
