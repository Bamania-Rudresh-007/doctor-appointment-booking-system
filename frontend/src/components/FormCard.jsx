import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Clipboard, Stethoscope, Sun, Sunset, Check } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';
import { PAYMENT_METHODS } from '../utils/helpers';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';
import InputField from './InputField';

const FormCard = () => {
  const { appointment, updateAppointment, bookAppointment } = useAppointment();

  const [apiMinTime, setApiMinTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState('morning');

  useEffect(() => {
    const fetchLatestAppointmentTime = async () => {
      try {
        setIsLoading(true);
        let nextAvailableTime = "11:30";
        setApiMinTime(nextAvailableTime);
      } catch (error) {
        console.error("Failed to fetch minimum dynamic time from API", error);
        setApiMinTime("08:00");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestAppointmentTime();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (appointment.fullName === "" || appointment.phoneNumber === "" || appointment.date === "" || appointment.time === "" || appointment.paymentMethod === "") {
        alert('Please fill out all fields.');
        return;
    }

    if (!appointment.date || !appointment.time) {
      alert("Please select both a preferred date and time slot.");
      return;
    }
    
    bookAppointment();
  };

  const handleMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  const allMorningSlots = ["08:00", "09:00", "10:00", "11:00"];
  const allAfternoonSlots = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const getAvailableSlotsForPeriod = (period) => {
    if (!appointment.date) return [];

    const selectedDateObj = new Date(appointment.date);
    const day = selectedDateObj.getDay();

    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = appointment.date === todayStr;

    const maxHour = day === 6 ? 14 : 18;
    const minHour = day === 6 ? 9 : 8;

    const baseSlots = period === 'morning' ? allMorningSlots : allAfternoonSlots;

    return baseSlots.filter(timeStr => {
      const currentHour = parseInt(timeStr.split(':')[0]);

      if (currentHour < minHour || currentHour >= maxHour) return false;

      if (isToday && apiMinTime) {
        const [apiH, apiM] = apiMinTime.split(':').map(Number);
        const apiTargetDecimal = apiH + (apiM / 60);
        if (currentHour < apiTargetDecimal) return false;
      }

      return true;
    });
  };

  const handleDateChange = (newDate) => {
    if (!newDate) {
      updateAppointment('date', '');
      return;
    }

    const selectedDay = new Date(newDate).getDay();

    if (selectedDay === 0) {
      alert("We are closed on Sundays! Please select a weekday or Saturday.");
      updateAppointment('date', '');
      updateAppointment('time', '');
    } else {
      updateAppointment('date', newDate);
      updateAppointment('time', '');
    }
  };

  const formatSlotLabel = (timeStr) => {
    const hour = parseInt(timeStr.split(':')[0]);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const nextHour = hour + 1;
    const nextDisplayHour = nextHour > 12 ? nextHour - 12 : nextHour;
    const nextAmpm = nextHour >= 12 ? 'PM' : 'AM';

    return `${displayHour}:00 ${ampm} - ${nextDisplayHour}:00 ${nextAmpm}`;
  };

  const currentAvailableSlots = getAvailableSlotsForPeriod(activePeriod);

  if (isLoading) {
    return (
      <GlassCard className="h-full flex items-center justify-center p-8">
        <p className="text-gray-500 font-medium animate-pulse">Syncing structural booking layouts...</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="h-full border border-white/40 shadow-2xl">
      <SectionTitle>Schedule an Appointment</SectionTitle>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Appointment Category</label>
          <div className="flex gap-4 mt-1.5">
            <button
              type="button"
              onClick={() => updateAppointment('category', 'regular')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all cursor-pointer ${
                appointment.category === 'regular'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-100 text-gray-400 hover:border-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-bold">Regular Appointment</span>
            </button>
            <button
              type="button"
              onClick={() => updateAppointment('category', 'emergency')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all cursor-pointer ${
                appointment.category === 'emergency'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-100 text-gray-400 hover:border-gray-200'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span className="text-sm font-bold">Emergency Booking</span>
            </button>
          </div>
        </div>

        <InputField
          label="Full Name"
          placeholder="John Doe"
          icon={User}
          value={appointment.fullName}
          onChange={(v) => updateAppointment('fullName', v)}
        />

        <InputField
          label="Phone Number"
          placeholder="(555) 000-0000"
          icon={Phone}
          value={appointment.phoneNumber}
          onChange={(v) => updateAppointment('phoneNumber', v)}
        />

        {/* Date Selection */}
        <InputField
          label="Preferred Date"
          type="date"
          icon={Calendar}
          minVal={handleMinDate()}
          maxVal={handleMaxDate()}
          value={appointment.date}
          onChange={handleDateChange}
        />

        {/* TIME SLOT PICKER */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" /> Preferred Session Time
          </label>

          {!appointment.date ? (
            <p className="text-sm text-gray-400 italic p-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-xl text-center">
              Please choose a date above to display available timeslots.
            </p>
          ) : (
            <div className="space-y-4">
              {/* Day Period Toggles */}
              <div className="flex gap-3 bg-gray-100/50 p-1.5 rounded-xl border border-gray-100">
                <button
                  type="button"
                  onClick={() => setActivePeriod('morning')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    activePeriod === 'morning'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Sun className="w-4 h-4" /> Morning
                </button>
                <button
                  type="button"
                  onClick={() => setActivePeriod('afternoon')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    activePeriod === 'afternoon'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Sunset className="w-4 h-4" /> Afternoon
                </button>
              </div>

              {/* Slots Grid */}
              {currentAvailableSlots.length === 0 ? (
                <p className="text-sm text-gray-400 italic py-6 text-center">
                  No slots available for this period. Try checking the other session.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentAvailableSlots.map((timeValue) => {
                    const isSelected = appointment.time === timeValue;
                    return (
                      <button
                        key={timeValue}
                        type="button"
                        onClick={() => updateAppointment('time', timeValue)}
                        className={`py-3 px-4 rounded-xl border text-left font-medium transition-all text-sm flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                            : 'border-gray-100 bg-white/50 text-gray-600 hover:border-gray-300 hover:bg-white'
                        }`}
                      >
                        <span>{formatSlotLabel(timeValue)}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <InputField
          label="Fees Payment Method"
          type="select"
          options={PAYMENT_METHODS}
          icon={Clipboard}
          value={appointment.paymentMethod}
          onChange={(v) => updateAppointment('paymentMethod', v)}
        />

        <InputField
          label="Symptoms / Notes (Optional)"
          type="textarea"
          placeholder="Briefly describe your symptoms..."
          value={appointment.notes}
          onChange={(v) => updateAppointment('notes', v)}
        />

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all cursor-pointer"
        >
          Confirm & Book Appointment
        </button>
      </form>
    </GlassCard>
  );
};

export default FormCard;