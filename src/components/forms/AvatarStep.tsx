import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

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
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'AvatarStep');
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
    <GenericStepWrapper
      step={stepData!}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
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
            </div>
            <div className={styles.formGroup}>
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
            </div>
            
            <div className={styles.actionRow}>
              <Button 
                variant="outline-only" 
                size="medium" 
                onClick={onPrev}
                fullWidth
              >
                Back
              </Button>
              <Button 
                variant="outline-only" 
                size="medium" 
                type="submit"
                fullWidth
              >
                Next
              </Button>
            </div>
      </form>
    </GenericStepWrapper>
  );
};

export default AvatarStep;
