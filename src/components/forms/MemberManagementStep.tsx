import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

interface MemberManagementStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const MemberManagementStep: React.FC<MemberManagementStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');
  
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'MemberManagementStep');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Member management:', { searchQuery, filterOption });
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
                id="searchQuery"
                name="searchQuery"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                placeholder="Search Members"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="filterOption"
                name="filterOption"
                value={filterOption}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterOption(e.target.value)}
                placeholder="Filter By Role"
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

export default MemberManagementStep;
