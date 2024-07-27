import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ToastContainer, toast } from "react-toastify";
import {
  FaLocationArrow,
  FaRegStar,
  FaEdit,
  FaPhone,
  FaRupeeSign
} from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import defaultImg from "../assets/images/2.jpg";
import authContext from "../context/auth/authContext";
import EditPropertyModal from "../components/EditPropertyModal";
import UserList from "../components/UserList";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interested, setInterested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const { loggedInUserData } = useContext(authContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
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
        const isInterested = userData.interestedProperties.some(
          (property) => property._id === id
        );
        setInterested(isInterested);

        if (loggedInUserData?.role === "admin") {
          // Fetch all users only if the logged-in user is an admin
          const usersResponse = await fetch(
            `${process.env.REACT_APP_HOST}/api/auth/users`,
            {
              headers: {
                "x-auth-token": localStorage.getItem("token"),
              },
            }
          );
          if (!usersResponse.ok) {
            throw new Error("Users not found");
          }
          const usersData = await usersResponse.json();
          setUsers(usersData);
        }
      } catch (error) {
        toast.error(error.message || "Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, loggedInUserData?.role]);

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
    <div className="min-h-screen flex flex-col items-center bg-gray-300 p-4 pt-24">
      <motion.div
        className="p-3 md:p-8 bg-white rounded-lg w-full max-w-2xl md:max-w-4xl backdrop-filter backdrop-blur-lg bg-opacity-90"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-900">
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
            <motion.div
              key={index}
              className="flex justify-center items-center h-60 md:h-96 rounded-lg overflow-hidden bg-gray-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={url}
                alt={`Property ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </Carousel>
        <motion.div
          className="flex flex-col items-center py-6 bg-gray-100 border border-gray-700 rounded-lg shadow-md md:space-y-6 space-y-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center gap-1">
            <FaLocationArrow className="text-blue-600 h-4 w-4" />
            <p className="text-gray-700 text-lg font-semibold">
              {property.location}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <FaRupeeSign className="text-green-600 h-7 w-7" />
            <p className="text-gray-900 text-4xl font-bold">
              {property.price.toLocaleString("en-IN")}
            </p>
          </div>
          <p className="text-gray-600 text-base md:text-lg text-center">{property.description}</p>

          <div className="flex justify-center items-center gap-3">
            <motion.button
              onClick={handleInterestedClick}
              className={`md:py-3 md:px-8 py-2 px-3 flex justify-center items-center rounded-full transition duration-300 ${
                interested
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {interested ? (
                <>
                  <GiCheckMark className="inline-block mr-2" /> Interested!
                </>
              ) : (
                <>
                  <FaRegStar className="inline-block mr-2" /> I am Interested
                </>
              )}
            </motion.button>
            {loggedInUserData?.role === "admin" ? (
              <motion.button
                onClick={() => setShowModal(true)}
                className="md:py-3 md:px-8 py-2 px-3 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <FaEdit className="inline-block mr-2" /> Edit Property
              </motion.button>
            ) : (
              <motion.button
                onClick={() => {
                  toast.success("We will connect you shortly!");
                }}
                className="md:py-3 md:px-8 py-2 px-3 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <FaPhone className="inline-block mr-2" /> Arrange Call
              </motion.button>
            )}
          </div>
        </motion.div>
        {loggedInUserData?.role === "admin" && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-extrabold text-blue-900 mb-4 text-center">
              Interested Users
            </h2>
            <UserList
              users={users.filter((user) =>
                property.interestedBy.includes(user._id)
              )}
            />
          </motion.div>
        )}
      </motion.div>
      {showModal && (
        <EditPropertyModal
          property={property}
          onClose={() => setShowModal(false)}
          onSave={(updatedProperty) => {
            setProperty(updatedProperty);
            setShowModal(false);
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default PropertyDetails;
