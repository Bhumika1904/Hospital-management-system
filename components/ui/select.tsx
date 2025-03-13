import React, { useState } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;  // Ensure children is included in SelectProps
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="w-full px-4 py-2 border rounded-md bg-white text-left"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value || 'Select an option'}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement<SelectItemProps>, {
              onValueChange,
              closeDropdown: () => setIsOpen(false),
            })
          )}
        </div>
      )}
    </div>
  );
};

interface SelectTriggerProps {
  id: string;
  children: React.ReactNode;  // Ensure children is included in SelectTriggerProps
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, id }) => (
  <div id={id} className="w-full px-4 py-2 border rounded-md">
    {children}
  </div>
);

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;

interface SelectItemProps {
  value: string;
  onValueChange: (value: string) => void;
  closeDropdown: () => void;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, onValueChange, closeDropdown, children }) => (
  <div
    onClick={() => {
      onValueChange(value);
      closeDropdown();
    }}
    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
  >
    {children}
  </div>
);

export const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <span className="text-gray-400">{placeholder}</span>
);
