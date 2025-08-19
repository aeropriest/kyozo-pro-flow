'use client';

import React, { useState } from 'react';
import { Input, Checkbox, Tabs } from '@/components/ui';
import ButtonUI from '@/components/ui/Button';
import { validateSignIn, validateSignUp } from '@/app/forms/auth.validation';
import { SignInData, SignUpData } from '@/app/forms/auth.types';
import styles from './SignInStep.module.scss';

interface SignInStepProps {
  onNext?: () => void;
  onSignIn?: (data: SignInData) => void;
  onSignUp?: (data: SignUpData) => void;
  onGoogleSignIn?: () => void;
}

const SignInStep: React.FC<SignInStepProps> = ({ onNext, onSignIn, onSignUp, onGoogleSignIn }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signInForm, setSignInForm] = useState<SignInData>({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState<SignUpData>({ fullName: '', email: '', password: '', terms: false });
  
  // Error states for form validation
  const [signInErrors, setSignInErrors] = useState<Partial<SignInData>>({});
  const [signUpErrors, setSignUpErrors] = useState<Partial<Record<keyof SignUpData, string>>>({});

  // Handle form input changes
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (signInErrors[name as keyof SignInData]) {
      setSignInErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (signUpErrors[name as keyof SignUpData]) {
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

  // Handle form submissions with validation
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateSignIn(signInForm);
    setSignInErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      console.log('Sign In:', signInForm);
      onSignIn?.(signInForm);
      onNext?.(); // Go to next step after sign in
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateSignUp(signUpForm);
    setSignUpErrors(errors);
    
    if (Object.keys(errors).length === 0) {
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
    <div className={styles.signInContainer}>
      <div className={styles.formFields}>
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
            </form>
          )}
        </div>
      </div>
      
      <div className={styles.actionButtons}>
        <ButtonUI 
          variant="outline-only" 
          size="medium" 
          onClick={() => {
            const event = new Event('submit') as unknown as React.FormEvent;
            activeTab === 'signin' ? handleSignIn(event) : handleSignUp(event);
          }}
          fullWidth
        >
          {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
        </ButtonUI>
        <ButtonUI 
          variant="outline-only" 
          size="medium" 
          onClick={handleGoogleSignIn}
          fullWidth
        >
          {activeTab === 'signin' ? 'Sign In with Google' : 'Sign Up with Google'}
        </ButtonUI>
      </div>
    </div>
  );
};

export default SignInStep;
