import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddPropertyForm = ({ onAddProperty }) => {
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast.error("You can only upload a maximum of 3 files.");
      e.target.value = "";
      return;
    }

    const invalidFiles = files.filter((file) => file.size > 1024 * 1024);

    if (invalidFiles.length > 0) {
      toast.error("Each file must be smaller than 1 MB.");
      e.target.value = "";
      return;
    }

    setNewProperty({
      ...newProperty,
      images: files,
    });
  };

  const validateForm = () => {
    if (newProperty.images.length === 0) {
      toast.error("Please select at least one image.");
      return false;
    }
    if (newProperty.images.length > 3) {
      toast.error("You can only upload a maximum of 3 files.");
      return false;
    }
    return true;
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onAddProperty(newProperty);
    setNewProperty({
      title: "",
      description: "",
      price: "",
      location: "",
      images: [],
    });
  };

  return (
    <motion.div
      className="flex flex-col w-full max-w-6xl bg-white p-4 md:p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-yellow-700 mb-6 flex items-center">
        <FaPlus className="text-yellow-600 text-2xl mr-3" /> Add Property
      </h2>
      <form
        onSubmit={handleAddProperty}
        className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newProperty.title}
            onChange={handleInputChange}
            placeholder="Enter property title"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={newProperty.description}
            onChange={handleInputChange}
            placeholder="Enter property description"
            className="p-3 border border-gray-300 rounded-md w-full h-32 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={newProperty.price}
            onChange={handleInputChange}
            placeholder="Enter property price"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={newProperty.location}
            onChange={handleInputChange}
            placeholder="Enter property location"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition duration-300"
        >
          Add Property
        </button>
      </form>
    </motion.div>
  );
};

export default AddPropertyForm;
