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
  const hasError = !!error;
  const hasValue = value !== undefined && value !== '';
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <div className={`${styles.formField} ${hasError ? styles.hasError : ''}`}>
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.formInput}
          placeholder=" "
          required={false} // Disable HTML5 validation
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        <label 
          htmlFor={inputId} 
          className={styles.formLabel}
        >
          {hasError ? error : (label || placeholder)}
          {required && !hasError && <span className={styles.required}>*</span>}
        </label>
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
