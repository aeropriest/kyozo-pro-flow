'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Dialog.module.scss';

interface Tab {
  label: string;
  count?: number;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showTabs?: boolean;
  tabs?: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  showTabs = false,
  tabs = [],
  activeTab = 0,
  onTabChange = () => {}
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div 
        ref={dialogRef}
        className={`${styles.dialog} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles.closeButton} onClick={onClose}>
            <span className={styles.closeIcon}>×</span>
          </button>
        </div>

        {showTabs && tabs.length > 0 && (
          <div className={styles.tabs}>
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`${styles.tab} ${index === activeTab ? styles.activeTab : ''}`}
                onClick={() => onTabChange(index)}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={styles.tabCount}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
