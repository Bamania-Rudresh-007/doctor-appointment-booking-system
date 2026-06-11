import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, placeholder, options, icon: Icon }) => {
  const baseClasses = "w-full p-4 border border-gray-100 rounded-xl bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300 shadow-sm";
  
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        {type === 'select' ? (
          <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className={`${baseClasses} cursor-pointer`}
          >
            <option value="">-- Select {label} --</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`${baseClasses} min-h-[100px] resize-none`}
          />
        ) : (
          <div className="relative">
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`${baseClasses} ${Icon ? 'pl-10' : ''}`}
            />
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
