'use client';

import React, { useState } from 'react';
import { AnimatedTitle } from '@/components/ui';
import SignInForm from '@/app/forms/SignInForm';
import SignUpForm from '@/app/forms/SignUpForm';
import styles from './SignInStep.module.scss';

interface SignInStepProps {
  onNext?: () => void;
}

const SignInStep: React.FC<SignInStepProps> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const toggleAuthMode = () => {
    setActiveTab(prev => prev === 'signin' ? 'signup' : 'signin');
  };

  const handleSignIn = (data: any) => {
    console.log('Sign In', data);
    // Navigate to next step after successful sign in
    onNext?.();
  };

  const handleSignUp = (data: any) => {
    console.log('Sign Up', data);
    // Navigate to next step after successful sign up
    onNext?.();
  };

  const handleGoogleAuth = () => {
    console.log(`Google ${activeTab === 'signin' ? 'Sign In' : 'Sign Up'}`);
    // Navigate to next step after successful Google auth
    onNext?.();
  };

  return (
    <>
      {/* Form fields only - no buttons */}
      <div className={styles.formContent}>
        {activeTab === 'signin'
          ? <SignInForm 
              onSignIn={handleSignIn} 
              onGoogleSignIn={handleGoogleAuth} 
            />
          : <SignUpForm 
              onSignUp={handleSignUp} 
              onGoogleSignUp={handleGoogleAuth} 
            />
        }
      </div>

      {/* Toggle between sign in/up */}
      <div className={styles.authToggle}>
        {activeTab === 'signin' ? (
          <p>
            Don't have an account?{' '}
            <button type="button" onClick={toggleAuthMode} className={styles.toggleButton}>
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button type="button" onClick={toggleAuthMode} className={styles.toggleButton}>
              Sign In
            </button>
          </p>
        )}
      </div>
    </>
  );
};

export default SignInStep;
