import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

interface AddMembersStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const AddMembersStep: React.FC<AddMembersStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('');
  
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'AddMembersStep');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Member details:', { memberEmail, memberRole });
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
                type="email"
                id="memberEmail"
                name="memberEmail"
                value={memberEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemberEmail(e.target.value)}
                placeholder="Member Email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="memberRole"
                name="memberRole"
                value={memberRole}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemberRole(e.target.value)}
                placeholder="Member Role"
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

export default AddMembersStep;
