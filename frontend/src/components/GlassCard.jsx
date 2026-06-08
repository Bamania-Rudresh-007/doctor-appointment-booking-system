import React from 'react';

const GlassCard = ({ children, className = "", dark = false }) => (
  <div className={`
    p-8 rounded-3xl shadow-2xl backdrop-blur-md 
    ${dark ? 'bg-[#121826] text-white shadow-2xl' : 'bg-white/90 border border-white/40 shadow-xl'}
    ${className}
  `}>
    {children}
  </div>
);

export default GlassCard;
