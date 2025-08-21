'use client';

import React from 'react';
import { Button } from '@/components/ui';
import styles from './GoogleAuthProfile.module.scss';
import { User } from 'firebase/auth';

interface GoogleAuthProfileProps {
  user: User;
  onContinue: () => void;
  onSignOut: () => void;
}

const GoogleAuthProfile: React.FC<GoogleAuthProfileProps> = ({
  user,
  onContinue,
  onSignOut,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome!</h2>
        <p className={styles.subtitle}>
          You've successfully signed in with Google
        </p>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'Profile'} 
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className={styles.userInfo}>
          <h3 className={styles.userName}>
            {user.displayName || 'User'}
          </h3>
          <p className={styles.userEmail}>
            {user.email}
          </p>
        </div>

        <div className={styles.verificationBadge}>
          <svg 
            className={styles.checkIcon} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          <span>Verified Account</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="outline"
          onClick={onSignOut}
        >
          Sign Out
        </Button>
        <Button
          variant="primary"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GoogleAuthProfile;
