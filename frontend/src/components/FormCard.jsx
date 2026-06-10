import React from 'react';
import { Calendar, Clock, User, Phone, Clipboard, Stethoscope } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';
import { PAYMENT_METHODS } from '../utils/helpers';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';
import InputField from './InputField';

const FormCard = () => {
  const { appointment, updateAppointment, bookAppointment } = useAppointment();

  const handleSubmit = (e) => {
    e.preventDefault();
    bookAppointment();
  };

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
          value={appointment.fullName}
          onChange={(v) => updateAppointment('fullName', v)}
        />

        <InputField
          label="Phone Number"
          placeholder="(555) 000-0000"
          value={appointment.phoneNumber}
          onChange={(v) => updateAppointment('phoneNumber', v)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Preferred Date"
            type="date"
            value={appointment.date}
            onChange={(v) => updateAppointment('date', v)}
          />
          <InputField
            label="Preferred Time"
            type="time"
            value={appointment.time}
            onChange={(v) => updateAppointment('time', v)}
          />
        </div>

        <InputField
          label="Fees Payment Method"
          type="select"
          options={PAYMENT_METHODS}
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          Confirm & Book Appointment
        </button>
      </form>
    </GlassCard>
  );
};

export default FormCard;
