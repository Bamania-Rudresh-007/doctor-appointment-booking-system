import axiosClient from './axiosClient';

const userService = {

  // Auth Endpoints
  registerAdmin: (userData) => axiosClient.post('/auth/register', userData),
  login: (userData) => axiosClient.post('/auth/login', userData),
  logout: () => axiosClient.post('/auth/logout'),
  refresh: () => axiosClient.post('/auth/refresh'),
  getAdmins: () => axiosClient.get('/auth/admins'),

  // Appointment Endpoints
  registerAppointment: (appointmentData) => axiosClient.post('/appointments/register', appointmentData),
  updateAppointment: (appointmentData) => axiosClient.put('/appointments/update', appointmentData),
  getAllAppointments: () => axiosClient.get('/appointments/all'),

};

export default userService;