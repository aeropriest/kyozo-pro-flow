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
  
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'CommunityDetailsStep');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Community details:', { communityName, communityDescription });
    onNext?.();
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommunityName(e.target.value)}
            placeholder="Community Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <Input
            type="text"
            id="communityDescription"
            name="communityDescription"
            value={communityDescription}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommunityDescription(e.target.value)}
            placeholder="Community Description"
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
