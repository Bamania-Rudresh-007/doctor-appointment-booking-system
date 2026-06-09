import React from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import GlassCard from './GlassCard';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Our Specialist */}
      <GlassCard>
        <h3 className="text-xl font-bold text-blue-900 mb-6">Our Specialist</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold text-blue-600">Dr. Riyaz</h4>
            <p className="text-sm font-semibold text-blue-400">Chief Medical Consultant</p>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Expert in general healthcare, patient consulting, and comprehensive family health services.
          </p>
        </div>
      </GlassCard>

      {/* Clinic Hours */}
    <div
        className="rounded-3xl p-6 sm:p-8 lg:p-10"
        style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)" }}
         >
        <h2
          className="text-white font-bold text-base sm:text-lg mb-5 sm:mb-6 pb-3"
          style={{ borderBottom: "2px solid rgba(255,255,255,0.08)" }}
        >
          Clinic Hours
        </h2>
        <p className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm mb-3">
          <span>🗓️</span> Monday – Friday: 8:00 AM – 6:00 PM
        </p>
        <p className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm mb-3">
          <span>🗓️</span> Saturday: 9:00 AM – 2:00 PM
        </p>
        <p className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm mb-4">
          <span>🔴</span> Sunday: Closed
        </p>
        <p
          className="text-red-300 text-xs font-bold pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          🚨 Emergency bookings answered 24/7 on call priority status.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
