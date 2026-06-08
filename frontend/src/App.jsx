import React from 'react';
import Header from './components/Header';
import FormCard from './components/FormCard';
import Sidebar from './components/Sidebar';
import ReceiptCard from './components/ReceiptCard';
import { useAppointment } from './context/AppointmentContext';

const App = () => {
  const { isBooked } = useAppointment();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[60%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {!isBooked ? (
          <>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-6 tracking-tight">
                Your Health Is Our <span className="text-blue-600">Top Priority</span>
              </h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Book an appointment with our experienced local doctor in under 2 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2">
                <FormCard />
              </div>
              <div className="lg:col-span-1">
                <Sidebar />
              </div>
            </div>
          </>
        ) : (
          <div className="py-10">
            <ReceiptCard />
          </div>
        )}
      </main>

      <footer className="text-center py-12 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} CareFirst Clinic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
