'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './welcome.module.scss';
import Button from '@/components/Button';
import Input from '@/components/Input';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import Checkbox from '@/components/Checkbox';

type FormMode = 'signup' | 'forgot';

interface LoginStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

const LoginStep: React.FC<LoginStepProps> = ({ onNext, onBack }) => {
  const router = useRouter();
  const [formMode, setFormMode] = useState<FormMode>('signup');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    whatsapp: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (formMode === 'signup') {
      if (!formData.firstName.trim()) return 'First name is required';
      if (!formData.lastName.trim()) return 'Last name is required';
      if (!formData.email.trim()) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email';
      if (formData.password.length < 6)
        return 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword)
        return 'Passwords do not match';
    } else if (formMode === 'forgot') {
      if (!formData.email.trim()) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email))
        return 'Please enter a valid email';
    }
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formMode === 'signup') {
        setShowCodeInput(true);
      } else if (formMode === 'forgot') {
        setFormMode('signup');
        setError('Password reset instructions sent to your email');
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationComplete = async (code: string) => {
    console.log('Verification code submitted:', code);
    setIsLoading(true);

    try {
      // Dummy verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (onNext) onNext();
    } catch (err: any) {
      console.error('Verification error:', err);
      setError('Invalid verification code. Please try again.');
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (showCodeInput) {
      setShowCodeInput(false);
    } else if (formMode === 'forgot') {
      setFormMode('signup');
    } else if (onBack) {
      onBack();
    }
    setError('');
  };

  return (
    <div className={styles.loginContainer}>
      {!showCodeInput ? (
        <div className={styles.authForm}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {formMode === 'signup' && (
              <div className={styles.nameFields}>
                <div className={styles.formGroup}>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoFocus={formMode === 'forgot'}
              />
            </div>

            {formMode === 'signup' && (
              <>
                <div className={styles.formGroup}>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.checkboxGroup}>
                  <Checkbox label="Subscribe to our newsletter" />
                  <Checkbox label="Get updates on WhatsApp" />
                </div>
              </>
            )}

            {formMode === 'forgot' && (
              <></> // No password inputs on forgot mode
            )}

            {error && <div className={styles.errorMessage}>{error}</div>}

            <Button
              type="submit"
              variant="primary"
              className={styles.submitButton}
              disabled={isLoading}
              fullWidth
            >
              {isLoading
                ? 'Please wait...'
                : formMode === 'signup'
                ? 'Create Account'
                : 'Reset Password'}
            </Button>

            {formMode === 'signup' && (
              <div className={styles.forgotPassword}>
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => setFormMode('forgot')}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {formMode === 'forgot' && (
              <div className={styles.forgotPassword}>
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => setFormMode('signup')}
                >
                  Back to Sign Up
                </button>
              </div>
            )}
          </form>

          <div className={styles.footer}>
            <p className={styles.terms}>
              By continuing, you agree to our{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.verificationContainer}>
          <h2>Verify Your Email</h2>
          <p className={styles.verificationText}>
            We've sent a 6-digit verification code to{' '}
            <span className={styles.email}>{formData.email}</span>
          </p>

          <VerificationCodeInput
            length={6}
            onComplete={handleVerificationComplete}
            className={styles.verificationInput}
          />

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.verificationFooter}>
            <p className={styles.resendText}>
              Didn't receive a code?{' '}
              <button
                type="button"
                className={styles.resendButton}
                onClick={() => {
                  console.log('Resend code clicked');
                }}
                disabled={isLoading}
              >
                Resend
              </button>
            </p>

            <div className={styles.buttonGroup}>
              <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (onNext) onNext();
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
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
