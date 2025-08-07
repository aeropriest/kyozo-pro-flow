'use client';
import React from 'react';
import styles from './Tabs.module.scss';

interface TabsProps {
  tabs: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs = [],
  activeTab = 0,
  onTabChange = () => {},
  className = '',
}) => {
  const handleTabClick = (index: number) => {
    onTabChange(index);
  };

  return (
    <div className={`${styles.tabsContainer} ${className}`}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${styles.tab} ${index === activeTab ? styles.activeTab : ''}`}
          onClick={() => handleTabClick(index)}
          role="tab"
          aria-selected={index === activeTab}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
