import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  className = '',
  placeholder = ' '
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isTextarea = type === 'textarea';
  const hasError = !!error;
  const hasValue = value.trim() !== '';
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Label should be active if input is focused OR has value
  const isLabelActive = isFocused || hasValue;
  
  // Create class names using composition instead of string concatenation
  const gradientBorderClasses = [
    styles.gradientBorder,
    hasError ? styles.error : '',
    isFocused ? styles.focused : ''
  ].filter(Boolean).join(' ');

  const inputClasses = [
    isTextarea ? styles.textarea : styles.input,
    hasError ? styles.error : ''
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.label,
    isLabelActive ? styles.active : styles.inactive,
    hasError ? styles.error : '',
    isFocused ? styles.focused : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <div className={gradientBorderClasses}>
        <div className={styles.innerContainer}>
          {isTextarea ? (
            <textarea
              id={id}
              name={id}
              className={inputClasses}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
            />
          ) : (
            <input
              id={id}
              name={id}
              type={type}
              className={inputClasses}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
            />
          )}
          <label 
            htmlFor={id} 
            className={labelClasses}
          >
            {label}
          </label>
        </div>
      </div>
      {hasError && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;
