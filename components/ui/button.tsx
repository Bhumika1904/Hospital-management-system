import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', children, className, ...props }) => {
  const baseClass = `px-4 py-2 rounded-md font-medium focus:outline-none focus:ring`;
  const variantClass = {
    default: 'bg-gray-200 text-black hover:bg-gray-300',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button className={`${baseClass} ${variantClass[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
