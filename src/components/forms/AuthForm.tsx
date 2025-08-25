'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Checkbox, Tabs, AnimatedTitle } from '@/components/ui';
import styles from './FormBase.module.scss';
import ButtonUI from '../ui/Button';
import { cards } from '../wizardData';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, getUserProfile, createUserProfile } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { saveOnboardingProgress, completeOnboardingStep } from '@/lib/onboarding';

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

  // If user is already authenticated, save auth data and proceed to next step
  useEffect(() => {
    if (user) {
      const saveAuthProgress = async () => {
        try {
          let userProfile = await getUserProfile(user.uid);
          
          // If no profile exists or no tenantId, create/update profile
          if (!userProfile || !userProfile.tenantId) {
            console.log('🔵 Creating/updating user profile with tenantId');
            userProfile = await createUserProfile(user);
          }
          
          if (userProfile && userProfile.tenantId) {
            await saveOnboardingProgress(
              userProfile.tenantId,
              user.uid,
              'auth',
              {
                email: user.email || '',
                displayName: user.displayName || '',
                authMethod: user.providerData[0]?.providerId === 'google.com' ? 'google' : 'email'
              },
              true // Mark as completed
            );
          } else {
            console.error('🔴 Unable to get tenantId for user');
          }
        } catch (error) {
          console.error('Error saving auth progress:', error);
        }
      };
      
      saveAuthProgress();
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
      // Show custom loading message for Google auth
      console.log('🔵 Starting Google authentication...');
      
      const result = await signInWithGoogle();
      console.log('🔵 Google authentication successful:', result.user.email);
      
      onGoogleSignIn?.();
      // onNext will be called automatically via useEffect when user state updates
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        // Don't show error for user-cancelled popup - this is expected behavior
        console.log('User cancelled Google sign-in popup');
        setAuthError(''); // Clear any existing errors
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError('Popup was blocked by your browser. Please allow popups and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Don't show error - user cancelled
        console.log('User cancelled Google sign-in');
        setAuthError(''); // Clear any existing errors
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
            loading={isLoading}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>
                {isLoading ? 'Opening Google...' : (activeTab === 'signin' ? 'Continue with Google' : 'Sign Up with Google')}
              </span>
            </div>
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
