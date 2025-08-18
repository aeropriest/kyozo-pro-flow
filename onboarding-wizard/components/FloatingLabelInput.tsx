
import React from 'react';
import type { ChangeEvent } from 'react';

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false
}) => {
  const isTextarea = type === 'textarea';
  const hasError = !!error;

  const inputClasses = `
    block w-full px-4 py-3 text-white bg-gray-800 border-2 
    border-gray-700 rounded-lg appearance-none 
    focus:outline-none focus:ring-0 peer transition-colors duration-300
    ${hasError ? 'border-red-500' : 'focus:border-transparent'}
  `;

  const labelClasses = `
    absolute text-sm text-gray-400 duration-300 transform 
    -translate-y-4 scale-75 top-2 z-10 origin-[0] 
    bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-purple-400
    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
    peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
    rtl:peer-focus:left-auto start-1
    ${hasError ? 'text-red-500 peer-focus:text-red-500' : ''}
  `;

  return (
    <div className="relative mb-6">
      <div className={`
        relative p-0.5 rounded-lg bg-gray-700 transition-all duration-300
        ${hasError ? 'bg-red-500' : 'focus-within:bg-gradient-to-r focus-within:from-purple-500 focus-within:to-pink-500'}
      `}>
        <div className="relative bg-gray-900 rounded-[7px]">
          {isTextarea ? (
            <textarea
              id={id}
              name={id}
              className={`${inputClasses} min-h-[120px]`}
              placeholder=" "
              value={value}
              onChange={onChange}
              required={required}
            />
          ) : (
            <input
              id={id}
              name={id}
              type={type}
              className={inputClasses}
              placeholder=" "
              value={value}
              onChange={onChange}
              required={required}
            />
          )}
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        </div>
      </div>
      {hasError && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FloatingLabelInput;
