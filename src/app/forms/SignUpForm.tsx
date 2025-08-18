'use client';

import React from 'react';
import AuthForm from './AuthForm';
import { validateSignUp } from './auth.validation';
import { SignUpData } from './auth.types';

interface Props {
  onSignUp?: (data: SignUpData) => void;
  onGoogleSignUp?: () => void;
}

const SignUpForm: React.FC<Props> = ({ onSignUp, onGoogleSignUp }) => {
  return (
    <AuthForm
      fields={[
        { name: 'fullName', type: 'text', placeholder: 'Your Name' },
        { name: 'email', type: 'email', placeholder: 'Your Email' },
        { name: 'password', type: 'password', placeholder: 'Create a password' },
        { name: 'terms', type: 'checkbox', label: <>I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a></> },
      ]}
      initialValues={{ fullName: '', email: '', password: '', terms: false }}
      validate={validateSignUp}
      onSubmit={onSignUp || (() => {})}
      submitText="Sign Up"
      googleText="Sign Up with Google"
      onGoogleClick={onGoogleSignUp}
    />
  );
};

export default SignUpForm;
