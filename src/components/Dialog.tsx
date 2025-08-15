'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Dialog.module.scss';
import FormVideo from './FormVideo';
import { Input, Button, Checkbox } from '@/components/ui'

interface Tab {
  label: string;
  count?: number;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  showTabs?: boolean;
  tabs?: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  step?: number;
  totalSteps?: number;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title = "Create Your Account",
  subtitle = "Sign up with your email or connect with Google.",
  children,
  className = '',
  showTabs = false,
  tabs = [],
  activeTab = 0,
  onTabChange = () => {},
  step = 1,
  totalSteps = 6
}) => {
  // Form state management
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });
  
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  // Handle form input changes
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submissions
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign In:', signInForm, 'Terms accepted:', termsAccepted);
    // Add actual sign in logic here
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up:', signUpForm, 'Terms accepted:', termsAccepted);
    // Add actual sign up logic here
  };
  
  // Handle tab changes
  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    onTabChange(index);
  };
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
              <p className={styles.stepIndicator}>Step {step} of {totalSteps}</p>
              {title && <h2 className={styles.title}>{title}</h2>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
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
                {children ? (
                  children
                ) : (
                  <div className={styles.authForm}>
                    {/* Form state management */}
                    <div className={styles.tabButtons}>
                      <button 
                        className={`${styles.tabButton} ${currentTab === 0 ? styles.activeTabButton : ''}`} 
                        onClick={() => handleTabChange(0)}
                      >
                        Sign In
                      </button>
                      <button 
                        className={`${styles.tabButton} ${currentTab === 1 ? styles.activeTabButton : ''}`} 
                        onClick={() => handleTabChange(1)}
                      >
                        Sign Up
                      </button>
                    </div>
                    
                    {currentTab === 0 ? (
                      /* Sign In Form */
                      <form onSubmit={handleSignIn}>
                        <div className={styles.formGroup}>
                          <Input 
                            type="email" 
                            name="email"
                            placeholder="Email address" 
                            value={signInForm.email}
                            onChange={handleSignInChange} 
                            className={styles.roundedInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Input 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={signInForm.password}
                            onChange={handleSignInChange} 
                            className={styles.roundedInput}
                          />
                        </div>
                        <div className={styles.forgotPassword}>
                          <a href="#">Forgot password?</a>
                        </div>
                        <div className={styles.formGroup}>
                          <Button variant="accent-fill" fullWidth type="submit">
                            Sign In
                          </Button>
                        </div>
                        <div className={styles.divider}>
                          <span>OR</span>
                        </div>
                        <div className={styles.formGroup}>
                          <Button variant="outline-only" fullWidth className={styles.googleButton}>
                            <img src="/google-icon.svg" alt="Google" className={styles.googleIcon} />
                            <span className={styles.googleText}>Sign in with Google</span>
                          </Button>
                        </div>
                        <div className={styles.termsContainer}>
                          <Checkbox
                            name="terms"
                            label="I agree to the Terms & Conditions"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                          />
                        </div>
                      </form>
                    ) : (
                      /* Sign Up Form */
                      <form onSubmit={handleSignUp}>
                        <div className={styles.formGroup}>
                          <Input 
                            type="text" 
                            name="fullName"
                            placeholder="Full name" 
                            value={signUpForm.fullName}
                            onChange={handleSignUpChange} 
                            className={styles.roundedInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Input 
                            type="email" 
                            name="email"
                            placeholder="Email address" 
                            value={signUpForm.email}
                            onChange={handleSignUpChange} 
                            className={styles.roundedInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Input 
                            type="password" 
                            name="password"
                            placeholder="Create password" 
                            value={signUpForm.password}
                            onChange={handleSignUpChange} 
                            className={styles.roundedInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Button variant="accent-fill" fullWidth type="submit">
                            Create Account
                          </Button>
                        </div>
                        <div className={styles.divider}>
                          <span>OR</span>
                        </div>
                        <div className={styles.formGroup}>
                          <Button variant="outline-only" fullWidth className={styles.googleButton}>
                            <img src="/google-icon.svg" alt="Google" className={styles.googleIcon} />
                            <span className={styles.googleText}>Sign up with Google</span>
                          </Button>
                        </div>
                        <div className={styles.termsContainer}>
                          <Checkbox
                            name="terms"
                            label="I agree to the Terms & Conditions"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                          />
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right curtain panel */}
        <div className={`${styles.dialogRight} ${isClosing ? styles.closingRight : ''}`}>
          <button className={styles.closeButton} onClick={handleClose}>
            <span className={styles.closeIcon}>×</span>
          </button>

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