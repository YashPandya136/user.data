import axios from 'axios';

const BASE_URL = 'https://259s7s89-7007.inc1.devtunnels.ms/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    // Check if we have a valid response
    if (response.status === 200 && response.data) {
      return response;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw {
        response: {
          data: {
            message: error.response.data.message || 'Login failed. Please check your credentials.'
          }
        }
      };
    } else if (error.request) {
      // The request was made but no response was received
      throw {
        response: {
          data: {
            message: 'No response from server. Please try again.'
          }
        }
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      throw {
        response: {
          data: {
            message: error.message || 'An error occurred. Please try again.'
          }
        }
      };
    }
  }
};

export const getUsersApi = async () => {
  try {
    const response = await api.get('/auth/getUsers');
    return response.data;
  } catch (error) {
    throw error;
  }
};