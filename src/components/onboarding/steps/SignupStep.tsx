'use client';

import React, { useState } from 'react';
import styles from './Steps.module.scss';

const SignupStep: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.stepContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </div>
        <div className={styles.socialLogin}>
          <button className={styles.googleButton}>
            <img src="/google-icon.svg" alt="Google" />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupStep;
