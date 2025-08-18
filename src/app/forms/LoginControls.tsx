'use client';

import React, { useState } from 'react';
import { Tabs, AnimatedTitle } from '@/components/ui';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import styles from './LoginControl.module.scss';

const LoginControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  return (
    <div className={styles.loginContainer}>
      <AnimatedTitle
        text="Welcome to Kyozo"
        subtitle="Sign in or Register to continue your journey"
        size="medium"
        className={styles.animatedTitle}
      />

      <Tabs
        tabs={['Sign In', 'Sign Up']}
        activeTab={activeTab === 'signin' ? 0 : 1}
        onTabChange={(i) => setActiveTab(i === 0 ? 'signin' : 'signup')}
      />

      <div className={styles.formContent}>
        {activeTab === 'signin'
          ? <SignInForm onSignIn={(d)=>console.log('Sign In', d)} onGoogleSignIn={()=>console.log('Google Sign In')} />
          : <SignUpForm onSignUp={(d)=>console.log('Sign Up', d)} onGoogleSignUp={()=>console.log('Google Sign Up')} />
        }
      </div>
    </div>
  );
};

export default LoginControl;
