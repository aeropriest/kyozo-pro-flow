'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Dialog.module.scss';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showTabs?: boolean;
  tabs?: string[];
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
  onTabChange = () => {},
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to ensure visibility before animation starts
      setTimeout(() => setIsAnimating(true), 10);
    } else if (isVisible) {
      setIsAnimating(false);
      // Wait for close animation to finish before hiding
      const timer = setTimeout(() => setIsVisible(false), 600); // Increased timeout for exit animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the backdrop element
    if (e.target instanceof HTMLElement && 
        e.target.className && 
        typeof e.target.className === 'string' && 
        e.target.className.includes(styles.dialogBackdrop) && 
        dialogRef.current && 
        !dialogRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={`${styles.dialogBackdrop} ${isAnimating ? styles.active : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        ref={dialogRef}
        className={`${styles.dialogContainer} ${isAnimating ? styles.active : ''} ${className}`}
        aria-modal="true"
        role="dialog"
      >
        <div className={styles.dialogContent}>
          {/* Curtain animation elements */}
          <div className={`${styles.curtainLeft} ${isAnimating ? styles.active : ''}`}></div>
          <div className={`${styles.curtainRight} ${isAnimating ? styles.active : ''}`}></div>
          
          {/* Dialog header with tabs */}
          <div className={styles.dialogHeader}>
            {showTabs && tabs.length > 0 ? (
              <div className={styles.tabsContainer}>
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`${styles.tab} ${index === activeTab ? styles.activeTab : ''}`}
                    onClick={() => onTabChange(index)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            ) : (
              <h3 className={styles.dialogTitle}>{title}</h3>
            )}
            <button 
              className={styles.closeButton} 
              onClick={onClose}
              aria-label="Close dialog"
            >
              &times;
            </button>
          </div>
          
          {/* Dialog body */}
          <div className={styles.dialogBody}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
