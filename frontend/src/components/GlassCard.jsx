import React from 'react';

const GlassCard = ({ children, className = "", dark = false }) => (
  <div className={`
   rounded-3xl p-6 sm:p-8 lg:p-10 
    ${dark ? 'bg-[#121826] text-white shadow-2xl' : 'bg-white/90 border border-white/40 shadow-xl'}
    ${className}
  `} 
    style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow:
        "0 20px 40px rgba(31,38,135,0.07), 0 1px 3px rgba(0,0,0,0.02)",
        border: "1px solid rgba(255,255,255,0.6)"
    }}
    >
    {children}
  </div>
);

export default GlassCard;
