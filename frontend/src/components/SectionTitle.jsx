import React from 'react';

const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-extrabold text-[#1a365d] mb-8 ${className}`}>
    {children}
  </h2>
);

export default SectionTitle;
