import React from 'react';
import { Phone, PlusSquare } from 'lucide-react';

const Header = () => (
  <header className="flex justify-between items-center py-4 px-6 md:px-12 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
    <div className="flex items-center gap-2">
      <div className="bg-indigo-600 p-1.5 rounded-lg">
        <PlusSquare className="text-white w-6 h-6" />
      </div>
      <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">CareFirst Clinic</h1>
    </div>
    <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
      <Phone className="w-4 h-4" />
      <span>Call Us: (555) 019-2834</span>
    </div>
  </header>
);

export default Header;
