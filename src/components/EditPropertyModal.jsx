import React, { useState } from "react";
import { toast } from "react-toastify";

const EditPropertyModal = ({ property, onClose, onSave }) => {
  const [updatedProperty, setUpdatedProperty] = useState({
    ...property,
    images: [] // Assuming images are handled separately
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProperty({
      ...updatedProperty,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    // Handle file changes if needed
  };

  const handleSave = async () => {
    try {
      // Assuming you have a function to update the property details
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/properties/${property._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedProperty),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        onSave(updatedData);
        toast.success("Property updated successfully!");
      } else {
        toast.error("Failed to update property");
      }
    } catch (error) {
      toast.error("Error updating property");
      console.error("Error updating property:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Property</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={updatedProperty.title}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={updatedProperty.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={updatedProperty.price}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={updatedProperty.location}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyModal;
