'use client';

import React, { ChangeEvent } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
  className = ''
}) => {
  return (
    <label className={`${styles.checkboxContainer} ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <span className={styles.checkmark}></span>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
