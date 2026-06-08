import React from 'react';

const ReceiptRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3 text-gray-500">
      {Icon && <Icon className="w-4 h-4" />}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-sm font-bold text-gray-800">{value || 'N/A'}</span>
  </div>
);

export default ReceiptRow;
