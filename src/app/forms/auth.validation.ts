import { SignInData, SignUpData } from './auth.types';

export const validateSignIn = (data: SignInData) => {
  const errors: Partial<SignInData> = {};
  if (!data.email) errors.email = 'Valid Email is required';
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Invalid email format';

  if (!data.password) errors.password = 'Password is required';

  return errors;
};

export const validateSignUp = (data: SignUpData) => {
  const errors: Partial<Record<keyof SignUpData, string>> = {};
  if (!data.fullName) errors.fullName = 'Name is required';

  if (!data.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Invalid email format';

  if (!data.password) errors.password = 'Password is required';
  else if (data.password.length < 6) errors.password = 'Password must be at least 6 characters';

  if (!data.terms) errors.terms = 'You must accept the terms';

  return errors;
};
