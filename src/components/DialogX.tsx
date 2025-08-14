'use client';

import React, { useState, useEffect } from 'react';
import AuthForm from './AuthForm';
import VideoPlayer from './VideoPlayer';
import Input from './Input';
import styles from './DialogX.module.scss';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const XCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const DialogX: React.FC<DialogProps> = ({ 
  isOpen, 
  onClose, 
  title = 'Welcome Back',
  subtitle = 'ACCOUNT ACCESS',
  children 
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle body scroll lock
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

  // Handle animation states
  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      // Small delay to ensure DOM is ready before animation
      timeoutId = window.setTimeout(() => setIsAnimating(true), 50);
    } else if (isRendered) {
      setIsAnimating(false);
      timeoutId = window.setTimeout(() => setIsRendered(false), 600); // Animation duration
    }
    return () => window.clearTimeout(timeoutId);
  }, [isOpen, isRendered]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isRendered) {
    return null;
  }

  const overlayClasses = `${styles.dialogOverlay} ${isAnimating ? styles.open : ''}`;
  const closeButtonClasses = `${styles.dialogCloseButton} ${isAnimating ? styles.visible : ''}`;
  const leftPanelClasses = `${styles.dialogPanel} ${styles.left} ${isAnimating ? styles.open : ''}`;
  const rightPanelClasses = `${styles.dialogPanel} ${styles.right} ${isAnimating ? styles.open : ''}`;
  const contentClasses = `${styles.dialogContent} ${isAnimating ? styles.visible : ''}`;

  return (
    <div className={overlayClasses} onClick={onClose} aria-modal="true" role="dialog">
      <div 
        className={styles.dialogBox}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={closeButtonClasses}
          aria-label="Close dialog"
        >
          <XCircleIcon />
        </button>

        {/* Left Curtain */}
        <div className={styles.dialogCurtainHalf}>
            <div className={leftPanelClasses}>
                <div className={contentClasses}>
                    {subtitle && <div className={styles.categoryLabel}>{subtitle}</div>}
                    {title && <h2>{title}</h2>}
                    {children || <AuthForm className="dialogX-form" />}
                </div>
            </div>
        </div>

        {/* Right Curtain */}
        <div className={styles.dialogCurtainHalf}>
            <div className={rightPanelClasses}>
                <div className={contentClasses}>
                    <VideoPlayer />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DialogX;
