import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

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

  const [bookingHistory, setBookingHistory] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  const updateAppointment = (field, value) => {
    setAppointment((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log(bookingHistory);
  }, [bookingHistory])

  const bookAppointment = () => {
    const newBooking = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    setBookingHistory((prev) => [newBooking, ...prev]);
    setLastBooking(newBooking);
    setIsBooked(true);
    
    // Reset form after booking (optional, but good for UX)
    // setAppointment({ category: 'regular', fullName: '', phoneNumber: '', date: '', time: '', paymentMethod: '', notes: '' });
  };

  const resetBooking = () => {
    setIsBooked(false);
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
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
