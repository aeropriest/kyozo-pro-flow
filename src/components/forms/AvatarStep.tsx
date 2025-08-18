import React, { useState } from 'react';
import styles from './CustomForm.module.scss';
import { Input } from '@/components/ui';
import CustomForm, { FormField } from './CustomForm';
import { cards } from '../wizardData';

interface AvatarStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const AvatarStep: React.FC<AvatarStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  // Find the step data from cards
  const stepIndex = cards.findIndex(step => step.component === 'AvatarStep');
  const [avatarName, setAvatarName] = useState('');
  const [avatarBio, setAvatarBio] = useState('');
  const [nameError, setNameError] = useState('');
  const [bioError, setBioError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setNameError('');
    setBioError('');
    
    // Validate display name
    if (!avatarName.trim()) {
      setNameError('Please fill out this field');
      isValid = false;
    }
    
    // Validate bio
    if (!avatarBio.trim()) {
      setBioError('Please fill out this field');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Avatar data:', { avatarName, avatarBio });
      onNext?.();
    }
  };

  return (
    <CustomForm
      stepIndex={stepIndex}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
      onSubmit={handleSubmit}
    >
      <FormField>
        <Input
          type="text"
          id="avatarName"
          name="avatarName"
          value={avatarName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAvatarName(e.target.value);
            if (nameError) setNameError('');
          }}
          placeholder="Display Name"
          error={nameError}
          required
        />
      </FormField>
      <FormField>
        <Input
          type="text"
          id="avatarBio"
          name="avatarBio"
          value={avatarBio}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAvatarBio(e.target.value);
            if (bioError) setBioError('');
          }}
          placeholder="Short Bio"
          error={bioError}
          required
        />
      </FormField>
    </CustomForm>
  );
};

export default AvatarStep;
