import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-4">A.H. Enterprises</h2>
            <p className="text-gray-400">
              Your trusted real estate consultant, helping you find your dream property.
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/about-us" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/experience" className="text-gray-400 hover:text-white">Experience</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400">123 Main Street, Downtown, Mumbai</p>
            <p className="text-gray-400">Phone: +91 98765 43210</p>
            <p className="text-gray-400">Email: info@ahenterprises.com</p>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495v-9.294H9.847V11.29h2.973V8.543c0-2.947 1.798-4.554 4.427-4.554 1.257 0 2.336.093 2.65.135v3.073h-1.818c-1.425 0-1.701.678-1.701 1.672v2.19h3.41l-.445 3.416h-2.965V24h5.805c.73 0 1.324-.593 1.324-1.324V1.324C24 .593 23.407 0 22.676 0z"/></svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.826 9.826 0 0 1-2.828.775 4.933 4.933 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.197 4.919 4.919 0 0 0-8.38 4.482A13.957 13.957 0 0 1 1.67 3.149 4.904 4.904 0 0 0 3.193 9.862 4.888 4.888 0 0 1 .96 9.144v.062a4.918 4.918 0 0 0 3.941 4.827 4.996 4.996 0 0 1-1.29.172c-.315 0-.623-.031-.924-.089a4.922 4.922 0 0 0 4.597 3.417 9.869 9.869 0 0 1-6.101 2.105c-.395 0-.785-.023-1.17-.068a13.955 13.955 0 0 0 7.548 2.212c9.055 0 14.01-7.504 14.01-14.01 0-.213-.005-.426-.014-.637A9.998 9.998 0 0 0 24 4.557z"/></svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.998 3A10 10 0 1 0 4 17.725v.8c0 1.292.993 2.398 2.295 2.475a10.001 10.001 0 1 0 13.703-18.999v-.001zm-8.25 15h-3v-7h3v7zm-1.5-8.188a1.688 1.688 0 1 1 .001-3.376 1.688 1.688 0 0 1 0 3.376zm8.75 8.188h-3v-3.875c0-1.055-.025-2.414-1.475-2.414-1.475 0-1.7 1.152-1.7 2.336v3.953h-3v-7h2.875v.953h.04c.399-.758 1.375-1.555 2.828-1.555 3.024 0 3.578 1.988 3.578 4.571v3.031z"/></svg>
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
