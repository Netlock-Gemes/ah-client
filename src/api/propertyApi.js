import axios from 'axios';

const API_URL = 'http://localhost:5000/api/properties';

export const getProperties = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
