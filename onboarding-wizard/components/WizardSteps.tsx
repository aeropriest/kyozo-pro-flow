import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { StepProps, OnboardingData } from '../types';
import FloatingLabelInput from './FloatingLabelInput';

// --- Validation Hook ---
const useFormValidation = (
  data: Partial<OnboardingData>,
  fields: (keyof OnboardingData)[],
  setStepValidity: (isValid: boolean) => void
) => {
  useEffect(() => {
    const isValid = fields.every(field => {
      const value = data[field];
      if (typeof value === 'string') return value.trim() !== '';
      if (value === null || value === undefined) return false;
      return true;
    });
    setStepValidity(isValid);
  }, [data, fields, setStepValidity]);
};

// --- Helper: Sign In Validation ---
const validateSignInField = (name: string, value: string) => {
    if (!value) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) return 'Email address is invalid.';
    if (name === 'password' && value.length < 8) return 'Password must be at least 8 characters.';
    return '';
};

// --- Step 1: Sign In ---
export const SignInStep: React.FC<StepProps> = ({ data, updateData, setStepValidity, isAttempted }) => {
  useFormValidation(data, ['email', 'password'], setStepValidity);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    setErrors(prev => ({ ...prev, [name]: validateSignInField(name, value) }));
  };

  useEffect(() => {
    if (isAttempted) {
      const emailError = validateSignInField('email', data.email || '');
      const passwordError = validateSignInField('password', data.password || '');
      if(emailError || passwordError) {
        setErrors({ email: emailError, password: passwordError });
      }
    }
  }, [isAttempted, data.email, data.password]);

  return (
    <form className="space-y-4" noValidate>
      <FloatingLabelInput
        id="email"
        label="Email Address"
        type="email"
        value={data.email || ''}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <FloatingLabelInput
        id="password"
        label="Password"
        type="password"
        value={data.password || ''}
        onChange={handleChange}
        error={errors.password}
        required
      />
    </form>
  );
};

// --- Step 2: Avatar Setup ---
export const AvatarStep: React.FC<StepProps> = ({ data, updateData, setStepValidity, isAttempted }) => {
  useFormValidation(data, ['avatar'], setStepValidity);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasError = isAttempted && !data.avatar;

  useEffect(() => {
    if (data.avatar) {
      const objectUrl = URL.createObjectURL(data.avatar);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
        setPreview(null);
    }
  }, [data.avatar]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ avatar: e.target.files[0] });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div
        className={`w-40 h-40 rounded-full bg-gray-800 border-4 border-dashed flex items-center justify-center cursor-pointer transition-colors ${
            hasError ? 'border-red-500' : 'border-gray-600 hover:border-purple-500'
        }`}
        onClick={handleAvatarClick}
      >
        {preview ? (
          <img src={preview} alt="Avatar Preview" className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-gray-400 text-center">Click to upload</span>
        )}
      </div>
       <button onClick={handleAvatarClick} className="text-purple-400 hover:text-purple-300">
        Choose a file
      </button>
      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      {hasError && <p className="mt-2 text-sm text-red-500">Please upload an avatar to continue.</p>}
    </div>
  );
};

// --- Step 3: Community Details ---
export const CommunityDetailsStep: React.FC<StepProps> = ({ data, updateData, setStepValidity, isAttempted }) => {
  useFormValidation(data, ['communityName', 'communityDescription'], setStepValidity);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = useCallback((fieldName: string, value: string) => {
    if (!value.trim()) {
      return 'This field is required.';
    }
    return '';
  }, []);

  useEffect(() => {
    if (isAttempted) {
      setErrors({
        communityName: validateField('communityName', data.communityName || ''),
        communityDescription: validateField('communityDescription', data.communityDescription || ''),
      });
    }
  }, [isAttempted, data.communityName, data.communityDescription, validateField]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  return (
    <form className="space-y-4">
      <FloatingLabelInput
        id="communityName"
        label="Community Name"
        value={data.communityName || ''}
        onChange={handleChange}
        error={errors.communityName}
        required
      />
      <FloatingLabelInput
        id="communityDescription"
        label="Community Description"
        type="textarea"
        value={data.communityDescription || ''}
        onChange={handleChange}
        error={errors.communityDescription}
        required
      />
    </form>
  );
};

// --- Step 4: Community Settings ---
export const CommunitySettingsStep: React.FC<StepProps> = ({ data, updateData, setStepValidity }) => {
    useFormValidation(data, ['communityPrivacy'], setStepValidity);

    useEffect(() => {
        if(!data.communityPrivacy) {
            updateData({ communityPrivacy: 'public' });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Privacy Settings</h3>
            <div className="flex space-x-4">
                <button
                    onClick={() => updateData({ communityPrivacy: 'public' })}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${data.communityPrivacy === 'public' ? 'bg-purple-600/20 border-purple-500' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}
                >
                    <h4 className="font-bold">Public</h4>
                    <p className="text-sm text-gray-400">Anyone can find and view your community.</p>
                </button>
                <button
                    onClick={() => updateData({ communityPrivacy: 'private' })}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${data.communityPrivacy === 'private' ? 'bg-purple-600/20 border-purple-500' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}
                >
                    <h4 className="font-bold">Private</h4>
                    <p className="text-sm text-gray-400">Only invited members can find and join.</p>
                </button>
            </div>
        </div>
    );
};

// --- Step 5: Add Members ---
export const AddMembersStep: React.FC<StepProps> = ({ data, updateData, setStepValidity, isAttempted }) => {
  useFormValidation(data, ['members'], setStepValidity);
  const [error, setError] = useState('');

  const validate = useCallback((value: string) => {
    if (!value?.trim()) return 'Please invite at least one member by email.';
    if (!value.includes('@') || !value.includes('.')) return 'Please enter valid, comma-separated emails.';
    return '';
  }, []);

  useEffect(() => {
    if (isAttempted) {
      setError(validate(data.members || ''));
    }
  }, [isAttempted, data.members, validate]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    updateData({ members: value });
    setError(validate(value));
  };

  return (
    <form className="space-y-2">
       <FloatingLabelInput
        id="members"
        label="Invite Members (comma separated emails)"
        type="textarea"
        value={data.members || ''}
        onChange={handleChange}
        error={error}
        required
      />
      <p className="text-xs text-gray-500">You can always add more members later.</p>
    </form>
  );
};


// --- Step 6: Member Management ---
export const MemberManagementStep: React.FC<StepProps> = ({ data, updateData, setStepValidity }) => {
  const members = data.members?.split(',').map(e => e.trim()).filter(e => e) || [];

  useEffect(() => {
    setStepValidity(true); // This step is for review, always valid
  }, [setStepValidity]);

  if (members.length === 0) {
    return <p className="text-gray-400 text-center">No members added yet. You can add them later from the dashboard.</p>;
  }

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
      {members.map((member) => (
        <div key={member} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
          <span className="text-gray-300">{member}</span>
          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Member</span>
        </div>
      ))}
    </div>
  );
};

// --- Step 7: Dashboard ---
export const DashboardStep: React.FC<StepProps> = ({ data }) => {
  return (
    <div className="text-center">
      <svg className="w-20 h-20 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h2 className="text-2xl font-bold text-white mb-2">Setup Complete!</h2>
      <p className="text-gray-400 mb-6">Your community, <span className="font-bold text-purple-400">{data.communityName}</span>, is ready.</p>
      <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
        Go to Dashboard
      </button>
    </div>
  );
};