'use client';

import React from 'react';
import AuthForm from './AuthForm';
import { validateSignIn } from './auth.validation';
import { SignInData } from './auth.types';

interface Props {
  onSignIn?: (data: SignInData) => void;
  onGoogleSignIn?: () => void;
}

const SignInForm: React.FC<Props> = ({ onSignIn, onGoogleSignIn }) => {
  return (
    <AuthForm
      fields={[
        { name: 'email', type: 'email', placeholder: 'Your Email' },
        { name: 'password', type: 'password', placeholder: 'Password' },
      ]}
      initialValues={{ email: '', password: '' }}
      validate={validateSignIn}
      onSubmit={onSignIn || (() => {})}
      submitText="Sign In"
      googleText="Sign In with Google"
      onGoogleClick={onGoogleSignIn}
      extraContent={
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <a href="#">Forgot password?</a>
        </div>
      }
    />
  );
};

export default SignInForm;
