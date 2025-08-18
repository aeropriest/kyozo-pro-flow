import React from 'react';
import styles from './Toggle.module.scss';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  disabled?: boolean;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  id,
  disabled = false,
  label
}) => {
  return (
    <div className={styles.toggleContainer}>
      {label && <label htmlFor={id} className={styles.toggleLabel}>{label}</label>}
      <label className={`${styles.toggle} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.toggleInput}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default Toggle;
