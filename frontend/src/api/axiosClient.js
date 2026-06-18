import axios from 'axios';
import { getAccessToken, clearAccessToken } from '../doctor-dashboard/utils/localStorage';

// 1. Create custom instance with environment variables
const axiosClient = axios.create({
  baseURL: "https://doctor-appointment-booking-system-la37.onrender.com/api" || "http://localhost:7300/api",
  timeout: 10000, // 10 seconds timeout window
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 2. Request Interceptor: Inject Auth Tokens automatically
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

// 3. Response Interceptor: Standardised returns & Global Error handling
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
