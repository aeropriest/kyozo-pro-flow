'use client';
import React from 'react';
import styles from './welcome.module.scss';
import Button from '@/components/Button';

interface SignupStepProps {
  onNext?: () => void;
}

const SignupStep: React.FC<SignupStepProps> = ({ onNext }) => {
  const handleEmailSignup = () => {
    // Handle email signup logic here
    console.log('Email signup clicked');
    if (onNext) onNext();
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log('Google signup clicked');
    if (onNext) onNext();
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupButtons}>
        <Button 
          variant="outline-only" 
          onClick={handleEmailSignup}
          className={styles.signupButton}
        >
          <span className={styles.buttonContent}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign up with Email
          </span>
        </Button>
        
        <Button 
          variant="outline-only" 
          onClick={handleGoogleSignup}
          className={styles.signupButton}
        >
          <span className={styles.buttonContent}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 20.8055 10.0415Z" fill="#FFC107"/>
              <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
              <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3037 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 15.7855L15.6095 15.7845L18.7045 18.4035C18.4855 18.6025 22 16 22 12C22 11.3295 21.931 10.675 20.8055 10.0415Z" fill="#1976D2"/>
            </svg>
            Continue with Google
          </span>
        </Button>
      </div>
      
      <p className={styles.signupTerms}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default SignupStep;
