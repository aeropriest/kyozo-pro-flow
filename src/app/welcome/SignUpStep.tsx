'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import styles from './welcome.module.scss';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import { FcGoogle } from 'react-icons/fc';
import VerificationCodeInput from '@/components/VerificationCodeInput';

interface SignupStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

const SignupStep: React.FC<SignupStepProps> = ({ onNext, onBack }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: searchParams.get('email') || '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.terms) return 'You must accept the terms and conditions';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Send verification code
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send verification code');
      }

      setVerificationSent(true);
      setEmailSentTo(formData.email);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // This will redirect to Google's sign-in page
      await signIn('google', { 
        callbackUrl: `${window.location.origin}/welcome?verifying=true` 
      });
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError('Failed to sign in with Google. Please try again.');
      setIsLoading(false);
    }
  };

  const handleVerificationComplete = async (code: string) => {
    try {
      setIsVerifying(true);
      setError('');
      
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email,
          code 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Verification failed');
      }

      // If verification is successful, proceed to next step
      if (onNext) onNext();
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Verification UI
  if (verificationSent) {
    return (
      <div className={styles.authForm}>
        <h2>Check your email</h2>
        <p className={styles.subtitle}>
          We've sent a 6-digit verification code to <strong>{emailSentTo}</strong>
        </p>
        <p className={styles.verificationNote}>
          Please enter the code to verify your email address.
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.verificationContainer}>
          <VerificationCodeInput
            length={6}
            onComplete={handleVerificationComplete}
            error={error}
            disabled={isVerifying}
          />
          
          <div className={styles.resendContainer}>
            <p>Didn't receive a code?</p>
            <button 
              className={styles.resendLink}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Resend code'}
            </button>
          </div>
          
          <button 
            className={styles.backButton}
            onClick={() => setVerificationSent(false)}
            disabled={isLoading}
          >
            Back to sign up
          </button>
        </div>
        
        {isVerifying && (
          <div className={styles.verifyingOverlay}>
            <div className={styles.verifyingSpinner} />
            <p>Verifying your code...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.authForm}>
      {/* <h2>Create your account</h2>
      <p className={styles.subtitle}>Join our community of creators and innovators</p> */}

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.nameFields}>
          {/* <Input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          /> */}
        </div>

        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <div className={styles.checkboxContainer}>
          <Checkbox
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            label={
              <span>
                I agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </span>
            }
          />
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          className={styles.signupButton}
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Sending code...
            </>
          ) : 'Sign Up'}
        </Button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className={styles.googleButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={styles.spinner}></span>
          ) : (
            <FcGoogle className={styles.googleIcon} />
          )}
          {isLoading ? 'Signing in...' : 'Sign up with Google'}
        </Button>
      </form>
    </div>
  );
};

export default SignupStep;
