import React, { useState, useEffect } from 'react';
import { StepProps } from '../../types/wizard';
import { useFormValidation, validateField } from '../../hooks/useFormValidation';
import Input from '../ui/Input';

// --- Step 1: User Information ---
export const UserInfoStep: React.FC<StepProps> = ({ 
  data, 
  updateData, 
  setStepValidity, 
  isAttempted 
}) => {
  useFormValidation(data, ['name', 'email'], setStepValidity);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  useEffect(() => {
    if (isAttempted) {
      const nameError = validateField('name', data.name || '');
      const emailError = validateField('email', data.email || '');
      if(nameError || emailError) {
        setErrors({ name: nameError, email: emailError });
      }
    }
  }, [isAttempted, data.name, data.email]);

  return (
    <div className="space-y-4">
      <Input
        id="name"
        label="Full Name"
        type="text"
        value={data.name || ''}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <Input
        id="email"
        label="Email Address"
        type="email"
        value={data.email || ''}
        onChange={handleChange}
        error={errors.email}
        required
      />
    </div>
  );
};

// --- Step 2: Account Setup ---
export const AccountSetupStep: React.FC<StepProps> = ({ 
  data, 
  updateData, 
  setStepValidity, 
  isAttempted 
}) => {
  useFormValidation(data, ['password', 'confirmPassword'], setStepValidity);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePasswords = (password: string, confirmPassword: string) => {
    const passwordError = validateField('password', password);
    let confirmError = '';
    
    if (!confirmPassword) {
      confirmError = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      confirmError = 'Passwords do not match';
    }
    
    return { password: passwordError, confirmPassword: confirmError };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    
    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : data.password || '';
      const confirmPassword = name === 'confirmPassword' ? value : data.confirmPassword || '';
      const validationErrors = validatePasswords(password, confirmPassword);
      setErrors(prev => ({ ...prev, ...validationErrors }));
    } else {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  useEffect(() => {
    if (isAttempted) {
      const validationErrors = validatePasswords(
        data.password || '', 
        data.confirmPassword || ''
      );
      setErrors(validationErrors);
    }
  }, [isAttempted, data.password, data.confirmPassword]);

  return (
    <div className="space-y-4">
      <Input
        id="password"
        label="Password"
        type="password"
        value={data.password || ''}
        onChange={handleChange}
        error={errors.password}
        required
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={data.confirmPassword || ''}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />
    </div>
  );
};

// --- Step 3: Preferences ---
export const PreferencesStep: React.FC<StepProps> = ({ 
  data, 
  updateData, 
  setStepValidity 
}) => {
  useFormValidation(data, ['bio'], setStepValidity);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="space-y-4">
      <Input
        id="bio"
        label="Bio"
        type="textarea"
        value={data.bio || ''}
        onChange={handleChange}
        error={errors.bio}
        required
      />
    </div>
  );
};

// --- Step 4: Completion ---
export const CompletionStep: React.FC<StepProps> = ({ data }) => {
  // This step is just a summary, so we'll always consider it valid
  useEffect(() => {
    // No validation needed for this step
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-opacity-10 bg-green-500 rounded-lg">
        <h3 className="text-lg font-medium text-green-400">Setup Complete!</h3>
        <p className="mt-2 text-gray-400">
          Thank you for completing the wizard. Here's a summary of your information:
        </p>
        <ul className="mt-4 space-y-2">
          <li><strong>Name:</strong> {data.name}</li>
          <li><strong>Email:</strong> {data.email}</li>
          <li><strong>Bio:</strong> {data.bio}</li>
        </ul>
      </div>
    </div>
  );
};
