import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import userService from '../api/userService';

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

const parseTimeToHHMM = (timeStr) => {
  if (!timeStr) return '08:00';
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return '08:00';
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  if (/PM/i.test(timeStr) && hours !== 12) hours += 12;
  if (/AM/i.test(timeStr) && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
};

export const AppointmentProvider = ({ children }) => {
  const [appointment, setAppointment] = useState({
    category: 'regular',
    fullName: '',
    phoneNumber: '',
    date: '',
    time: '',
    paymentMethod: '',
    notes: '',
  });

  const [isBooked, setIsBooked] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState(null);
  const [apiMinTime, setApiMinTime] = useState('08:00');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const fetchLatestAppointmentTime = useCallback(async () => {
    try {
      setSlotsLoading(true);
      setSlotsError(null);
      const response = await userService.getLatestAppointmentTime();
      const time = response?.data?.time;
      setApiMinTime(parseTimeToHHMM(time));
    } catch (err) {
      const isUnauthorized = err.response?.status === 401;
      if (!isUnauthorized) {
        setSlotsError(
          err.response?.data?.message ||
            err.message ||
            'Unable to load available time slots',
        );
      }
      setApiMinTime('08:00');
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestAppointmentTime();
  }, [fetchLatestAppointmentTime]);

  const updateAppointment = (field, value) => {
    setAppointment((prev) => ({ ...prev, [field]: value }));
  };

  const bookAppointment = async () => {
    try {
      setBookingLoading(true);
      setBookingError(null);
      const response = await userService.registerAppointment(appointment);
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to book appointment');
      }
      const created = response.data.appointment;
      const newBooking = {
        ...appointment,
        id: created._id,
        timestamp: created.createdAt || new Date().toISOString(),
      };
      setLastBooking(newBooking);
      setIsBooked(true);
    } catch (err) {
      setBookingError(
        err.response?.data?.message ||
          err.message ||
          'Failed to book appointment',
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const resetBooking = () => {
    setIsBooked(false);
    setBookingError(null);
    setAppointment({
      category: 'regular',
      fullName: '',
      phoneNumber: '',
      date: '',
      time: '',
      paymentMethod: '',
      notes: '',
    });
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        updateAppointment,
        bookAppointment,
        isBooked,
        lastBooking,
        resetBooking,
        slotsLoading,
        slotsError,
        apiMinTime,
        bookingLoading,
        bookingError,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
