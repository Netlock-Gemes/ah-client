import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import defaultImg from "../assets/images/2.jpg";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interested, setInterested] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);

    const fetchProperty = async () => {
      try {
        // Fetch property details
        const propertyResponse = await fetch(
          `${process.env.REACT_APP_HOST}/api/properties/${id}`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (!propertyResponse.ok) {
          throw new Error("Property not found");
        }
        const propertyData = await propertyResponse.json();
        setProperty(propertyData);

        // Check if the user is already interested in the property
        const userResponse = await fetch(
          `${process.env.REACT_APP_HOST}/api/auth/user`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (!userResponse.ok) {
          throw new Error("User not found");
        }
        const userData = await userResponse.json();

        // Check if the property ID is in the list of interested properties
        const isInterested = userData.interestedProperties.some(
            (property) => property._id === id
          );
        setInterested(isInterested);
      } catch (error) {
        toast.error(error.message || "Error fetching property details");
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInterestedClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/properties/interest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ propertyId: id }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        const newInterested =
          updatedData.user.interestedProperties.includes(id);
        setInterested(newInterested);
        toast.success(
          newInterested
            ? "Added to your interested properties!"
            : "Removed from your interested properties!"
        );
      } else {
        toast.error("Failed to update interest status");
      }
    } catch (error) {
      toast.error("Error updating interest status");
      console.error("Error updating interest status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="text-lg text-gray-600">Property not found</div>
      </div>
    );
  }

  const imageUrls =
    property.images.length > 0
      ? property.images.map((img) => `${process.env.REACT_APP_HOST}/${img}`)
      : [defaultImg];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 p-4 md:pt-24">
      <motion.div
        className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-xl md:max-w-3xl backdrop-filter backdrop-blur-lg bg-opacity-80 shadow-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
          {property.title}
        </h1>
        <Carousel
          showThumbs={false}
          showIndicators={true}
          infiniteLoop
          autoPlay
          interval={5000}
          transitionTime={700}
          className="mb-8"
        >
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="flex justify-center items-center md:h-96 h-60 rounded-lg overflow-hidden"
            >
              <img
                src={url}
                alt={`Property ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
          ))}
        </Carousel>
        <div className="flex flex-col items-center">
          <p className="text-gray-700 mb-4 text-lg font-semibold">
            {property.location}
          </p>
          <p className="text-gray-800 font-semibold text-3xl mb-4">
            ₹{property.price.toLocaleString("en-IN")}
          </p>
          <p className="text-gray-600 text-center mb-6">
            {property.description}
          </p>
          <button
            onClick={handleInterestedClick}
            className={`py-3 px-8 rounded-full transition duration-300 ${
              interested
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {interested ? "Interested!" : "I am Interested"}
          </button>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default PropertyDetails;
