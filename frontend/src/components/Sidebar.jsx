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
      <GlassCard dark>
        <h3 className="text-2xl font-bold mb-10 tracking-tight">Clinic Hours</h3>
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-[15px] font-bold">Monday - Friday</p>
              <p className="text-xs text-gray-400 font-medium">8:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-[15px] font-bold">Saturday</p>
              <p className="text-xs text-gray-400 font-medium">9:00 AM - 2:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
              <Clock className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-[15px] font-bold">Sunday: Closed</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-xs text-red-400 leading-relaxed">
              Emergency bookings are answered <span className="font-bold">24/7 on call priority status.</span>
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Sidebar;
