'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Dialog.module.scss';
import FormVideo from './FormVideo';

interface Tab {
  label: string;
  count?: number;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
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
  subtitle,
  children,
  className = '',
  showTabs = false,
  tabs = [],
  activeTab = 0,
  onTabChange = () => {}
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 600); // Match animation duration (0.6s)
  };

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        handleClose();
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
        handleClose();
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

  if (!isOpen && !isClosing) return null;

  return (
    <div className={styles.overlay}>
      <div 
        ref={dialogRef}
        className={`${styles.dialog} ${className} ${isClosing ? styles.closing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left curtain panel */}
        <div className={`${styles.dialogLeft} ${isClosing ? styles.closingLeft : ''}`}>
          <div className={styles.header}>
            <div>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              {title && <h2 className={styles.title}>{title}</h2>}
            </div>
          </div>

          <div className={styles.dialogContent}>
            <div className={styles.leftContent}>
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
        </div>
        
        {/* Right curtain panel */}
        <div className={`${styles.dialogRight} ${isClosing ? styles.closingRight : ''}`}>
          <div className={styles.header}>
            <button className={styles.closeButton} onClick={handleClose}>
              <span className={styles.closeIcon}>×</span>
            </button>
          </div>

          <div className={styles.dialogContent}>  
            <div className={styles.rightContent}>
              <FormVideo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;