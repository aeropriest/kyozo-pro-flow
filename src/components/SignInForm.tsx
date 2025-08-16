'use client';

import React, { useState } from 'react';
import { Button, Input, Checkbox, Tabs, AnimatedTitle } from '@/components/ui';
import styles from './SignInForm.module.scss';
import ButtonUI from './ui/Button';

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
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ fullName: '', email: '', password: '', terms: false });

  // Handle form input changes
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm(prev => ({ ...prev, terms: e.target.checked }));
  };

  // Handle form submissions
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign In:', signInForm);
    onSignIn?.(signInForm);
    onNext?.(); // Go to next step after sign in
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up:', signUpForm);
    if (signUpForm.terms) {
      onSignUp?.(signUpForm);
      onNext?.(); // Go to next step after sign up
    } else {
      alert('Please accept the terms and conditions');
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
      <h2 className={styles.cardTitle}>Welcome to Kyozo</h2>
      {description && <p className={styles.cardDescription}>{description}</p>}
      
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
                      alert('Please accept the terms and conditions');
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
