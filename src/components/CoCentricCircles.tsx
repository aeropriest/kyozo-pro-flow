'use client';
import React, { forwardRef, ChangeEvent, ForwardedRef } from 'react';
import styles from './Checkbox.module.scss';

const CoCentricCircles = forwardRef<HTMLInputElement, CoCentricCirclesProps>(({
  label,
  checked,
  onChange,
  name,
  id,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const checkboxId = id || name;
  
  return (
    <div className={`${styles.checkboxWrapper} ${className}`}>
      <label className={styles.checkboxContainer}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.checkboxInput}
          {...props}
        />
        <span className={styles.checkmark}></span>
        {label && <span className={styles.checkboxLabel}>{label}</span>}
      </label>
    </div>
  );
});

CoCentricCircles.displayName = 'CoCentricCircles';

export default CoCentricCircles;
