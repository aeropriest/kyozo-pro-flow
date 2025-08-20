'use client';
import React, { forwardRef } from 'react';
import styles from './TextArea.module.scss';

interface TextAreaProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  rows?: number;
  // Remove index signature to avoid type conflicts
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
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
  rows = 3,
  ...props
}, ref) => {
  const textAreaId = id || name;
  const [isFocused, setIsFocused] = React.useState(false);
  const hasValue = value !== undefined && value !== '';
  const showFloatingLabel = isFocused || hasValue;
  
  return (
    <div className={`${styles.textAreaWrapper} ${className}`}>
      <div className={`${styles.textAreaContainer} ${error ? styles.hasError : ''}`}>
        <textarea
          ref={ref}
          id={textAreaId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={error ? error : (showFloatingLabel ? '' : placeholder)}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`${styles.textArea} ${error ? styles.hasError : ''}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {(label || placeholder) && (
          <label 
            htmlFor={textAreaId} 
            className={`${styles.floatingLabel} ${showFloatingLabel ? styles.active : styles.hidden}`}
          >
            {label || placeholder}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
