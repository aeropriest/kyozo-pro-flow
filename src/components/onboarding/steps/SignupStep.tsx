'use client';

import React, { useState, FormEvent } from 'react';
import styles from './Steps.module.scss';
import Input from '../../ui/Input';

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const SignupStep: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formState.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formState.password) {
      newErrors.password = 'Password is required';
    } else if (formState.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error on change if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log('Form submitted successfully:', formState);
      // Here you would typically send the data to a server
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className={styles.stepContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Your Email"
          label="Email"
          error={errors.email}
          required
        />
        <Input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Create a password"
          label="Password"
          error={errors.password}
          required
        />
        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </div>
        <div className={styles.socialLogin}>
          <button type="button" className={styles.googleButton}>
            <img src="/google-icon.svg" alt="Google" />
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupStep;
