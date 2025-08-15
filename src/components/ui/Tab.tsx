import React from 'react';
import styles from './Tab.module.scss';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick, count }) => {
  return (
    <button
      className={`${styles.tab} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <span className={styles.tabLabel}>{label}</span>
      {count !== undefined && (
        <span className={styles.tabCount}>{count}</span>
      )}
    </button>
  );
};

export default Tab;
