import axios from 'axios';
import { getAccessToken, clearAccessToken } from '../doctor-dashboard/utils/localStorage';

const isDevelopment = import.meta.env.DEV;

const axiosClient = axios.create({
  baseURL: isDevelopment 
    ? "http://localhost:7300/api" 
    : "https://doctor-appointment-booking-system-la37.onrender.com/api",
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // Return only data payload to components for cleaner code
    return response.data;
  },
  (error) => {
    // Centralized API fallback mechanics
    if (error.response) {
      const status = error.response.status;
      
      if (status === 401) {
        const hadToken = Boolean(getAccessToken());
        clearAccessToken();
        if (hadToken) {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        console.error('Forbidden: Access denied.');
      } else if (status === 500) {
        console.error('Internal Server Error. Please try again later.');
      }
    } else if (error.request) {
      console.error('Network Error: No response received from server.');
    } else {
      console.error('Error config setup:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
