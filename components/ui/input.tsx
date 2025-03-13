import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
      {...props}
    />
  );
};

