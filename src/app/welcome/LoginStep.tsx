'use client';
import React, { useState } from 'react';
import styles from './welcome.module.scss';
import Button from '@/components/Button';
import Input from '@/components/Input';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import Image from 'next/image';

interface LoginStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

const LoginStep: React.FC<LoginStepProps> = ({ onNext, onBack }) => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    
    // In a real app, you would call your API here
    setTimeout(() => {
      setIsLoading(false);
      setShowCodeInput(true);
    }, 1000);
  };
  
  const handleVerificationComplete = (code: string) => {
    console.log('Verification code submitted:', code);
    // Here you would verify the code with your backend
    // For now, just move to the next step
    if (onNext) onNext();
  };
  
  const handleBack = () => {
    setShowCodeInput(false);
    setError('');
  };

  return (
    <div className={styles.loginContainer}>
      {!showCodeInput ? (
        <div className={styles.loginForm}>
          <div className={styles.loginOptions}>
            <Button 
              variant="outline" 
              className={styles.optionButton}
              onClick={() => {
                // Show email input when email option is clicked
                const emailInput = document.getElementById('emailInput');
                if (emailInput) {
                  emailInput.style.display = 'block';
                  emailInput.focus();
                }
              }}
            >
              <span className={styles.optionIcon}>✉️</span>
              <span>Continue with Email</span>
            </Button>
            
            <div id="emailInput" className={styles.emailInputContainer} style={{display: 'none'}}>
              <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className={styles.emailField}
                  required
                  autoFocus
                  autoComplete="email"
                  aria-label="Email address"
                />
                {error && (
                  <div className={styles.errorMessage}>{error}</div>
                )}
                <Button 
                  type="submit"
                  variant="primary"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending code...' : 'Send Code'}
                </Button>
              </form>
            </div>
            
            <div className={styles.divider}>
              <span>or</span>
            </div>
            
            <Button 
              variant="outline" 
              className={styles.optionButton}
              onClick={() => {
                // Handle Google sign in
                console.log('Google sign in');
                // For demo, simulate sending verification code after Google sign in
                setTimeout(() => {
                  setShowCodeInput(true);
                }, 1000);
              }}
            >
              <Image 
                src="/google-icon.svg" 
                alt="Google" 
                width={20} 
                height={20}
                className={styles.optionIcon}
              />
              <span>Continue with Google</span>
            </Button>
          </div>
          
          <p className={styles.loginTerms}>
            By continuing, you agree to our{' '}
            <a href="/terms" className={styles.termsLink}>Terms of Service</a> and{' '}
            <a href="/privacy" className={styles.termsLink}>Privacy Policy</a>
          </p>
        </div>
      ) : (
        <div className={styles.verificationContainer}>
          <div className={styles.verificationHeader}>
            <button 
              type="button" 
              onClick={handleBack}
              className={styles.backButton}
              aria-label="Go back to login options"
            >
              ←
            </button>
            <h2 className={styles.verificationTitle}>Enter 6-digit code</h2>
          </div>
          
          <p className={styles.verificationSubtitle}>
            We've sent a verification code to
            <br />
            <strong>{email || 'your email'}</strong>
          </p>
          
          <VerificationCodeInput 
            onComplete={handleVerificationComplete}
            className={styles.verificationCode}
          />
          
          <div className={styles.verificationActions}>
            <Button 
              variant="primary"
              className={styles.verifyButton}
              onClick={() => {
                // Handle verification
                if (onNext) onNext();
              }}
            >
              Verify & Continue
            </Button>
            
            <p className={styles.resendCode}>
              Didn't receive a code?{' '}
              <button 
                type="button" 
                className={styles.resendLink}
                onClick={() => {
                  console.log('Resend code');
                  // Add resend logic here
                }}
              >
                Resend code
              </button>
            </p>
          </div>
          
          <p className={styles.verificationNote}>
            This helps us keep your account secure.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginStep;
