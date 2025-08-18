import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

interface CommunityDetailsStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const CommunityDetailsStep: React.FC<CommunityDetailsStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  
  // Error states
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'CommunityDetailsStep');

  // Handle input changes with error clearing
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityName(e.target.value);
    if (nameError) setNameError('');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityDescription(e.target.value);
    if (descriptionError) setDescriptionError('');
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setNameError('');
    setDescriptionError('');
    
    // Validate community name
    if (!communityName.trim()) {
      setNameError('Community name is required');
      isValid = false;
    }
    
    // Validate community description
    if (!communityDescription.trim()) {
      setDescriptionError('Community description is required');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Community details:', { communityName, communityDescription });
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
            id="communityName"
            name="communityName"
            value={communityName}
            onChange={handleNameChange}
            placeholder="Community Name"
            error={nameError}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <Input
            type="text"
            id="communityDescription"
            name="communityDescription"
            value={communityDescription}
            onChange={handleDescriptionChange}
            placeholder="Community Description"
            error={descriptionError}
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

export default CommunityDetailsStep;
