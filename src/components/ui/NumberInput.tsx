'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './NumberInput.module.scss';

interface NumberInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  length = 6,
  onComplete,
  className = '',
  error = '',
  disabled = false
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only take the last character if multiple entered
    setCode(newCode);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all digits are filled
    if (newCode.every(digit => digit) && newCode.length === length) {
      onComplete?.(newCode.join(''));
    }
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('').slice(0, length);
      const newCode = [...code];
      
      digits.forEach((digit, i) => {
        if (i < length) {
          newCode[i] = digit;
        }
      });
      
      setCode(newCode);
      
      // Focus the next empty input or the last one if all filled
      const nextIndex = Math.min(length - 1, digits.length);
      inputRefs.current[nextIndex]?.focus();
      
      // If all digits are filled, trigger onComplete
      if (digits.length >= length) {
        onComplete?.(newCode.join(''));
      }
    }
  };

  return (
    <div className={`${styles.NumberInput} ${className}`}>
      <div className={styles.inputsContainer}>
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`${styles.input} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of verification code`}
          />
        ))}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default NumberInput;
