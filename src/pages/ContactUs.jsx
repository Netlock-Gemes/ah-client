import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaMobileAlt,
} from "react-icons/fa";
import heroImg from "../assets/images/4.jpg";
import contactImg from "../assets/images/5.jpg";

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    message: "",
  });

  const [btnLoader, setBtnLoader] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (!errors) {
      setBtnLoader(true);
      try {
        const response = await fetch("https://example.com/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setMessage("Message Sent Successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNo: "",
          email: "",
          message: "",
        });
      } catch (error) {
        setMessage("Error sending message. Please try again.");
      } finally {
        setBtnLoader(false);
      }
    } else {
      setMessage("Please fill out all fields correctly.");
    }
  };

  const validateForm = (data) => {
    if (
      data.firstName.trim() &&
      data.lastName.trim() &&
      data.email.trim() &&
      data.phoneNo.trim() &&
      data.message.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="bg-gray-300">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={animationVariants.slideUp}
          viewport={{ once: true }}
          className="flex flex-col w-full h-full mx-auto px-6 text-center text-white bg-gray-700/60 pt-32 pb-24"
        >
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We are here to assist you. Feel free to reach out to us for any
            inquiries or support.
          </p>
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <div className="flex justify-center items-center px-6 py-16 backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-gray-800">
        <motion.div
          initial="initial"
          animate="animate"
          variants={animationVariants.fadeIn}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
            </div>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Phone No"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="4"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className={`w-full p-2 text-white rounded ${
                btnLoader ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={btnLoader}
            >
              {btnLoader ? "Sending..." : "Submit"}
            </button>
          </form>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </motion.div>
      </div>

      {/* Contact Information Section */}
      <div
        className="bg-cover bg-center text-white py-16"
        style={{ backgroundImage: `url(${contactImg})` }}
      >
        <div className="container mx-auto px-6 text-center bg-blue-900/70 rounded-lg p-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={animationVariants.fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-center gap-2">
                <FaMapMarkerAlt className="text-blue-300" /> Shop No.3, New
                Surya Kiran CHS. Ltd., Opp. Galaxy Hotel, S.T. Depot Rd.,
                Nallasopara (W) - 401 203.
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaMobileAlt className="text-blue-300" /> Hamdan Kachhawa - 7977416857
              </li>
              <li className="flex items-center justify-center gap-2">
              <FaMobileAlt className="text-blue-300" /> Shadab Khan - 8983488363
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaEnvelope className="text-blue-300" /> hamdankachhawa96@gmail.com
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaEnvelope className="text-blue-300" /> sk642127@gmail.com
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
