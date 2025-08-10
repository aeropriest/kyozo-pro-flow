'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './welcome.module.scss';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import { FcGoogle } from 'react-icons/fc';

interface SignupStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

const SignupStep: React.FC<SignupStepProps> = ({ onNext, onBack }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (onNext) onNext();
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
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className={styles.authForm}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.nameFields}>
          <Input
            type="text"
            name="firstName"
            placeholder="Firstname"
            value={formData.firstName}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Lastname"
            value={formData.lastName}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
        </div>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <div className={styles.checkboxContainer}>
          <Checkbox
            id="terms"
            name="terms"
            label="I agree to the Terms and Conditions"
            checked={formData.terms}
            onChange={handleInputChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <Button 
          type="submit" 
          variant="outline-only"
          disabled={isLoading}
          className={styles.signupButton}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <Button
          type="button"
          variant="outline-only"
          onClick={() => console.log('Continue with Google')}
          className={styles.googleButton}
        >
          <FcGoogle className={styles.googleIcon} />
          Sign up with Google
        </Button>
      </form>
    </div>
  );
};

export default SignupStep;
