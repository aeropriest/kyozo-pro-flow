'use client';

import React, { useState } from 'react';
import { Input, Checkbox, Tabs, Button } from '@/components/ui';
import styles from './CustomForm.module.scss';
import { cards } from '../wizardData';
import CustomForm, { FormField } from './CustomForm';

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
  const [formError, setFormError] = useState<string>('');

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

    if (!signInForm.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signInForm.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!signInForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setSignInErrors(errors);
    return isValid;
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
      errors.email = 'Email is invalid';
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

  // Handle sign in submission
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (validateSignInForm()) {
      try {
        if (onSignIn) {
          onSignIn(signInForm);
        } else if (onNext) {
          onNext(); // Go to next step if no specific sign in handler
        }
      } catch (error) {
        setFormError('An error occurred during sign in. Please try again.');
      }
    } else {
      // Force re-render to show errors
      setSignInErrors({...signInErrors});
      
      // Scroll to the first error
      const firstErrorElement = document.querySelector(`.${styles.errorMessage}`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Handle sign up submission
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (validateSignUpForm()) {
      try {
        if (onSignUp) {
          onSignUp(signUpForm);
        } else if (onNext) {
          onNext(); // Go to next step if no specific sign up handler
        }
      } catch (error) {
        setFormError('An error occurred during sign up. Please try again.');
      }
    } else {
      // Force re-render to show errors
      setSignUpErrors({...signUpErrors});
      
      // Scroll to the first error
      const firstErrorElement = document.querySelector(`.${styles.errorMessage}`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In');
    onGoogleSignIn?.();
    onNext?.(); // Go to next step after Google sign in
  };

  return (
    <CustomForm
      stepIndex={0} // SignInForm is the first card (index 0)
      currentStep={currentStep}
      totalSteps={totalSteps}
      onSubmit={activeTab === 'signin' ? handleSignInSubmit : handleSignUpSubmit}
      formError={formError}
    >
      <div className={styles.formControls}>
        <Tabs
          tabs={['Sign In', 'Sign Up']}
          activeTab={activeTab === 'signin' ? 0 : 1}
          onTabChange={(index) => setActiveTab(index === 0 ? 'signin' : 'signup')}
          className={styles.tabs}
        />

        <div className={styles.formContent}>
          {activeTab === 'signin' ? (
            <form onSubmit={handleSignInSubmit}>
              <FormField>
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
              </FormField>
              <FormField>
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
              </FormField>
              <div className={styles.forgotPassword}>
                <a href="#">Forgot password?</a>
              </div>
              <div className={styles.actionRow}>
                <Button 
                  variant="outline-only" 
                  size="medium" 
                  type="submit"
                  fullWidth
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline-only" 
                  size="medium" 
                  onClick={handleGoogleSignIn}
                  fullWidth
                >
                  Sign In with Google
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit}>
              <FormField>
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
              </FormField>
              <FormField>
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
              </FormField>
              <FormField>
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
              </FormField>
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
                <Button 
                  variant="outline-only" 
                  size="medium" 
                  type="submit"
                  fullWidth
                >
                  Sign Up
                </Button>
                <Button
                  variant="outline-only"
                  size="medium"
                  fullWidth
                  onClick={handleGoogleSignIn}
                >
                  Sign Up with Google
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </CustomForm>
  );
};

export default SignInForm;
