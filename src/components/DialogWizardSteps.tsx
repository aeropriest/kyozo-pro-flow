import React, { useState, useEffect, ChangeEvent } from 'react';
import { StepProps, WizardStep } from '../types/wizard';
import { useFormValidation, validateField } from '../hooks/useFormValidation';
import { Input, Checkbox } from '@/components/ui';

// --- Step 1: Sign In / Sign Up ---
export const SignInStep: React.FC<StepProps> = ({ 
  data, 
  updateData, 
  setStepValidity, 
  isAttempted 
}) => {
  useFormValidation(data, ['email', 'password'], setStepValidity);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [termsAccepted, setTermsAccepted] = useState(data.termsAccepted || false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setTermsAccepted(checked);
    updateData({ termsAccepted: checked });
  };

  useEffect(() => {
    if (isAttempted) {
      const emailError = validateField('email', data.email || '');
      const passwordError = validateField('password', data.password || '');
      if(emailError || passwordError) {
        setErrors({ email: emailError, password: passwordError });
      }
    }
    
    // Also validate terms acceptance
    const isValid = !!data.email && 
      !!data.password && 
      !validateField('email', data.email || '') && 
      !validateField('password', data.password || '') &&
      termsAccepted;
    
    console.log('SignInStep validation:', { 
      email: data.email, 
      password: data.password, 
      termsAccepted, 
      isValid 
    });
    
    setStepValidity(isValid);
  }, [isAttempted, data.email, data.password, termsAccepted, setStepValidity]);

  return (
    <div className="space-y-4">
      <Input
        id="email"
        label="Email Address"
        type="email"
        value={data.email || ''}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        value={data.password || ''}
        onChange={handleChange}
        error={errors.password}
        required
      />
      <div className="mt-4">
        <Checkbox
          id="terms"
          name="terms"
          label="I agree to the Terms & Conditions"
          checked={termsAccepted}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

// --- Step 2: Personal Information ---
export const PersonalInfoStep: React.FC<StepProps> = ({ 
  data, 
  updateData, 
  setStepValidity, 
  isAttempted 
}) => {
  useFormValidation(data, ['fullName', 'phone'], setStepValidity);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [name]: `${name === 'fullName' ? 'Full name' : 'Phone'} is required` }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  useEffect(() => {
    if (isAttempted) {
      const nameError = !data.fullName ? 'Full name is required' : '';
      const phoneError = !data.phone ? 'Phone number is required' : '';
      if(nameError || phoneError) {
        setErrors({ fullName: nameError, phone: phoneError });
      }
    }
  }, [isAttempted, data.fullName, data.phone]);

  return (
    <div className="space-y-4">
      <Input
        id="fullName"
        label="Full Name"
        type="text"
        value={data.fullName || ''}
        onChange={handleChange}
        error={errors.fullName}
        required
      />
      <Input
        id="phone"
        label="Phone Number"
        type="text"
        value={data.phone || ''}
        onChange={handleChange}
        error={errors.phone}
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
  const [newsletter, setNewsletter] = useState(data.newsletter !== false);
  const [whatsapp, setWhatsapp] = useState(data.whatsapp || false);
  
  useEffect(() => {
    // This step is always valid
    setStepValidity(true);
  }, [setStepValidity]);

  const handleNewsletterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setNewsletter(checked);
    updateData({ newsletter: checked });
  };

  const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setWhatsapp(checked);
    updateData({ whatsapp: checked });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Communication Preferences</h3>
      <div className="space-y-3">
        <Checkbox
          id="newsletter"
          name="newsletter"
          label="Subscribe to our newsletter"
          checked={newsletter}
          onChange={handleNewsletterChange}
        />
        <Checkbox
          id="whatsapp"
          name="whatsapp"
          label="Receive updates via WhatsApp"
          checked={whatsapp}
          onChange={handleWhatsappChange}
        />
      </div>
    </div>
  );
};

// --- Step 4: Completion ---
export const CompletionStep: React.FC<StepProps> = ({ data }) => {
  useEffect(() => {
    // This step is always valid as it's just a confirmation
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-opacity-10 bg-green-500 rounded-lg">
        <h3 className="text-lg font-medium text-green-400">Registration Complete!</h3>
        <p className="mt-2 text-gray-400">
          Thank you for joining Kyozo Pro. Your account has been created successfully.
        </p>
        <ul className="mt-4 space-y-2">
          <li><strong>Name:</strong> {data.fullName}</li>
          <li><strong>Email:</strong> {data.email}</li>
          <li><strong>Phone:</strong> {data.phone}</li>
        </ul>
      </div>
    </div>
  );
};
