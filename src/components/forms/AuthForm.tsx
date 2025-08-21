'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Checkbox, Tabs, AnimatedTitle } from '@/components/ui';
import styles from './FormBase.module.scss';
import ButtonUI from '../ui/Button';
import { cards } from '../wizardData';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';

interface AuthFormProps {
  onSignIn?: (data: { email: string; password: string }) => void;
  onSignUp?: (data: { fullName: string; email: string; password: string }) => void;
  onGoogleSignIn?: () => void;
  onNext?: () => void;
  currentStep?: number;
  totalSteps?: number;
  description?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSignIn,
  onSignUp,
  onGoogleSignIn,
  onNext,
  currentStep = 1,
  totalSteps = 6,
  description,
}) => {
  const { user } = useAuth();
  // Get the step data from the cards array
  const stepData = cards[0]; // AuthForm is the first card (index 0)
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ fullName: '', email: '', password: '', terms: false });
  
  // Error states for form validation
  const [signInErrors, setSignInErrors] = useState({ email: '', password: '' });
  const [signUpErrors, setSignUpErrors] = useState({ fullName: '', email: '', password: '', terms: '' });
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // If user is already authenticated, proceed to next step
  useEffect(() => {
    if (user) {
      onNext?.();
    }
  }, [user, onNext]);

  // Handle form input changes
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (signInErrors[name as keyof typeof signInErrors]) {
      setSignInErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (signUpErrors[name as keyof typeof signUpErrors]) {
      setSignUpErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm(prev => ({ ...prev, terms: e.target.checked }));
    // Clear terms error when user checks the box
    if (signUpErrors.terms) {
      setSignUpErrors(prev => ({ ...prev, terms: '' }));
    }
  };

  // Validate sign in form
  const validateSignInForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    if (!signInForm.email) {
      errors.email = 'Valid Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signInForm.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!signInForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setSignInErrors(errors);
    return isValid;
  };

  // Handle form submissions
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateSignInForm()) {
      setIsLoading(true);
      setAuthError('');
      
      try {
        await signInWithEmail(signInForm.email, signInForm.password);
        onSignIn?.(signInForm);
        // onNext will be called automatically via useEffect when user state updates
      } catch (error: any) {
        console.error('Sign in error:', error);
        setAuthError(error.message || 'Failed to sign in');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Validate sign up form
  const validateSignUpForm = () => {
    const errors = { fullName: '', email: '', password: '', terms: '' };
    let isValid = true;

    if (!signUpForm.fullName) {
      errors.fullName = 'Name is required';
      isValid = false;
    }

    if (!signUpForm.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signUpForm.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!signUpForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (signUpForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!signUpForm.terms) {
      errors.terms = 'You must accept the terms';
      isValid = false;
    }

    setSignUpErrors(errors);
    return isValid;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateSignUpForm()) {
      setIsLoading(true);
      setAuthError('');
      
      try {
        await signUpWithEmail(signUpForm.email, signUpForm.password, signUpForm.fullName);
        onSignUp?.(signUpForm);
        // onNext will be called automatically via useEffect when user state updates
      } catch (error: any) {
        console.error('Sign up error:', error);
        setAuthError(error.message || 'Failed to sign up');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      await signInWithGoogle();
      onGoogleSignIn?.();
      // onNext will be called automatically via useEffect when user state updates
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        // Don't show error for user-cancelled popup - this is expected behavior
        console.log('User cancelled Google sign-in popup');
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError('Popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Don't show error - user cancelled
        console.log('User cancelled Google sign-in');
      } else {
        setAuthError(error.message || 'Failed to sign in with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.topSection}>
        <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
        <AnimatedTitle
          text={stepData.title}
          subtitle={stepData.description}
          size="large"
          className={styles.animatedTitle}
        />
      </div>

      {/* Middle Section: Form controls */}
      <div className={styles.middleSection}>
        <div className={styles.formControls}>
          {authError && (
            <div className={styles.errorMessage}>
              {authError}
            </div>
          )}

          <Tabs
            tabs={['Sign In', 'Sign Up']}
            activeTab={activeTab === 'signin' ? 0 : 1}
            onTabChange={(index) => setActiveTab(index === 0 ? 'signin' : 'signup')}
            className={styles.tabs}
          />

          <div className={styles.formContent}>
            {activeTab === 'signin' ? (
              <form onSubmit={handleSignIn} noValidate>
                <div className={styles.formGroup}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={signInForm.email}
                    onChange={handleSignInChange}
                    placeholder="Your Email"
                    error={signInErrors.email}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={signInForm.password}
                    onChange={handleSignInChange}
                    placeholder="Password"
                    error={signInErrors.password}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className={styles.forgotPassword}>
                  <a href="#">Forgot password?</a>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignUp} noValidate>
                <div className={styles.formGroup}>
                  <Input
                    type="text"
                    id="name"
                    name="fullName"
                    value={signUpForm.fullName}
                    onChange={handleSignUpChange}
                    placeholder="Your Name"
                    error={signUpErrors.fullName}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    type="email"
                    id="signUpEmail"
                    name="email"
                    value={signUpForm.email}
                    onChange={handleSignUpChange}
                    placeholder="Your Email"
                    error={signUpErrors.email}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    type="password"
                    id="signUpPassword"
                    name="password"
                    value={signUpForm.password}
                    onChange={handleSignUpChange}
                    placeholder="Create a password"
                    error={signUpErrors.password}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className={styles.termsCheckbox}>
                  <Checkbox
                    id="terms"
                    name="terms"
                    checked={signUpForm.terms}
                    onChange={handleTermsChange}
                    label={
                      <span>
                        I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                      </span>
                    }
                  />
                  {signUpErrors.terms && (
                    <div className={styles.errorMessage}>{signUpErrors.terms}</div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Action buttons */}
      <div className={styles.bottomSection}>
        <div className={styles.actionRow}>
          <ButtonUI 
            variant="outline-only" 
            size="medium" 
            onClick={() => {
              const event = new Event('submit') as unknown as React.FormEvent;
              activeTab === 'signin' ? handleSignIn(event) : handleSignUp(event);
            }} 
            fullWidth
            disabled={isLoading}
            loading={isLoading}
          >
            {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </ButtonUI>
          <ButtonUI 
            variant="outline-only" 
            size="medium" 
            onClick={handleGoogleSignIn}
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : (activeTab === 'signin' ? 'Sign In with Google' : 'Sign Up with Google')}
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
