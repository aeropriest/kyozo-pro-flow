'use client';

import React, { useState, ChangeEvent } from 'react';
import styles from './AuthForm.module.scss';
import Input from './Input';
import Button from './Button';
import Checkbox from './Checkbox';

interface AuthFormProps {
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Additional checkbox handling if needed
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, isSignUp });
    // Add your authentication logic here
  };

  return (
    <div className={`${styles.authFormContainer} ${className}`}>
      <h2 className={styles.formTitle}>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            required
            className={styles.customInput}
          />
        </div>
        
        <div className={styles.formGroup}>
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleInputChange}
            required
            className={styles.customInput}
          />
        </div>

        {isSignUp && (
          <div className={styles.formGroup}>
            <Checkbox
              name="terms"
              label="I agree to the Terms and Conditions"
              checked={true}
              onChange={handleCheckboxChange}
              className={styles.customCheckbox}
            />
          </div>
        )}
        
        <Button 
          type="submit"
          variant="accent-fill"
          size="medium"
          fullWidth
          className={styles.customButton}
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
      
      <div className={styles.switchMode}>
        <Button 
          variant="minimal"
          size="small"
          onClick={() => setIsSignUp(!isSignUp)}
          className={styles.switchButton}
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
