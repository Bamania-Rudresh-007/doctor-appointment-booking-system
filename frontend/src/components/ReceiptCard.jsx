import React from 'react';
import { CheckCircle, Calendar, Clock, User, Phone, IndianRupee, ArrowLeft } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';
import { formatTime, FEES } from '../utils/helpers';
import GlassCard from './GlassCard';
import ReceiptRow from './ReceiptRow';

const ReceiptCard = () => {
  const { lastBooking, resetBooking } = useAppointment();

  if (!lastBooking) return null;

  const fee = lastBooking.category === 'emergency' ? FEES.emergency : FEES.regular;

  return (
    <GlassCard className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Appointment Confirmed!</h2>
        <p className="text-gray-500 mt-2">Your booking has been successfully recorded.</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 space-y-1 mb-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Booking Receipt</span>
          <span className="text-xs font-mono text-gray-400">ID: {lastBooking.id}</span>
        </div>
        
        <ReceiptRow label="Patient Name" value={lastBooking.fullName} icon={User} />
        <ReceiptRow label="Phone Number" value={lastBooking.phoneNumber} icon={Phone} />
        <ReceiptRow label="Appointment Date" value={lastBooking.date} icon={Calendar} />
        <ReceiptRow label="Appointment Time" value={formatTime(lastBooking.time)} icon={Clock} />
        <ReceiptRow label="Category" value={lastBooking.category.toUpperCase()} />
        <ReceiptRow label="Payment Method" value={lastBooking.paymentMethod} />
        
        <div className="pt-4 mt-4 border-t-2 border-dashed border-gray-200">
          <ReceiptRow 
            label="Total Consultation Fee" 
            value={`₹${fee}`} 
            icon={IndianRupee}
          />
        </div>

        {lastBooking.paymentMethod.includes("Pay from Home") && (
          <div className="mt-6 p-6 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <p className="font-bold text-lg mb-3 text-blue-600 flex items-center gap-2">
                  📲 Clinic UPI Details
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong className="text-gray-600">UPI ID:</strong> 
                    <code className="ml-2 bg-white px-3 py-1 border border-slate-200 rounded text-blue-700 font-mono text-xs">
                      carefirstclinic@upi
                    </code>
                  </p>
                  <p className="text-sm">
                    <strong className="text-gray-600">Payable Amount:</strong> 
                    <span className="ml-2 font-bold text-gray-900">${fee}.00</span>
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 italic mt-4 leading-relaxed">
                  💡 Please complete the payment using any UPI app (GPay/PhonePe/Paytm) and keep your transaction ID ready for verification at the clinic.
                </p>
              </div>
              <div className="shrink-0 bg-white p-2 rounded-xl shadow-sm border border-blue-100">
                <img 
                  src="/qr-code.png" 
                  alt="Payment QR Code" 
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={resetBooking}
        className="w-full flex items-center justify-center gap-2 text-blue-600 font-bold py-2 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Book Another Appointment
      </button>
    </GlassCard>
  );
};

export default ReceiptCard;
