'use client';

import React, { useState } from 'react';
import { Button, Input, Checkbox, Tabs, AnimatedTitle } from '@/components/ui';
import styles from './SignInForm.module.scss';
import ButtonUI from './ui/Button';
import { cards } from './wizardData';

interface SignInFormProps {
  onSignIn?: (data: { email: string; password: string }) => void;
  onSignUp?: (data: { fullName: string; email: string; password: string }) => void;
  onGoogleSignIn?: () => void;
  onNext?: () => void;
  currentStep?: number;
  totalSteps?: number;
  description?: string;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSignIn,
  onSignUp,
  onGoogleSignIn,
  onNext,
  currentStep = 1,
  totalSteps = 6,
  description,
}) => {
  // Get the step data from the cards array
  const stepData = cards[0]; // SignInForm is the first card (index 0)
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ fullName: '', email: '', password: '', terms: false });
  
  // Error states for form validation
  const [signInErrors, setSignInErrors] = useState({ email: '', password: '' });
  const [signUpErrors, setSignUpErrors] = useState({ fullName: '', email: '', password: '', terms: '' });

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
      errors.email = 'Email is required';
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
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateSignInForm()) {
      console.log('Sign In:', signInForm);
      onSignIn?.(signInForm);
      onNext?.(); // Go to next step after sign in
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

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateSignUpForm()) {
      console.log('Sign Up:', signUpForm);
      onSignUp?.(signUpForm);
      onNext?.(); // Go to next step after sign up
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In');
    onGoogleSignIn?.();
    onNext?.(); // Go to next step after Google sign in
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>{stepData.title}</h2>
      <p className={styles.cardDescription}>{stepData.description}</p>
      
      {/* <AnimatedTitle 
        text="Welcome to Kyozo" 
        subtitle="Sign in to continue your journey" 
        size="medium" 
        className={styles.animatedTitle}
      /> */}
      <div className={styles.formControls}>
        <Tabs
          tabs={['Sign In', 'Sign Up']}
          activeTab={activeTab === 'signin' ? 0 : 1}
          onTabChange={(index) => setActiveTab(index === 0 ? 'signin' : 'signup')}
          className={styles.tabs}
        />

        <div className={styles.formContent}>
          {activeTab === 'signin' ? (
            <form onSubmit={handleSignIn}>
              <div className={styles.formGroup}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={signInForm.email}
                  onChange={handleSignInChange}
                  placeholder="Your Email"
                  error={signInErrors.email}
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
                  required
                />
              </div>
              <div className={styles.forgotPassword}>
                <a href="#">Forgot password?</a>
              </div>
              <div className={styles.actionRow}>
                <ButtonUI variant="outline-only" size="medium" href="#" fullWidth>Sign In</ButtonUI>
                <ButtonUI 
                  variant="outline-only" 
                  size="medium" 
                  onClick={handleGoogleSignIn}
                  fullWidth
                >
                  Sign In with Google
                </ButtonUI>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <div className={styles.formGroup}>
                <Input
                  type="text"
                  id="name"
                  name="fullName"
                  value={signUpForm.fullName}
                  onChange={handleSignUpChange}
                  placeholder="Your Name"
                  error={signUpErrors.fullName}
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
              <div className={styles.actionRow}>
                <ButtonUI 
                  variant="outline-only" 
                  size="medium" 
                  fullWidth
                  onClick={() => {
                    if (signUpForm.terms) {
                      const event = new Event('submit') as unknown as React.FormEvent;
                      handleSignUp(event);
                    } else {
                      validateSignUpForm(); // Show validation errors
                    }
                  }}
                >
                  Sign Up
                </ButtonUI>
                <ButtonUI
                  variant="outline-only"
                  size="medium"
                  fullWidth
                  onClick={handleGoogleSignIn}
                >
                  Sign Up with Google
                </ButtonUI>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
