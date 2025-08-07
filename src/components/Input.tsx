'use client';
import React, { forwardRef, ChangeEvent, ForwardedRef } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  [key: string]: any; // For any additional props
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  id,
  required = false,
  disabled = false,
  className = '',
  label = '',
  error = '',
  ...props
}, ref) => {
  const inputId = id || name;
  
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputContainer}>
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.hasError : ''}`}
          {...props}
        />
      </div>
      
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
