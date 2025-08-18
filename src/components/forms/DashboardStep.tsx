import React from 'react';
import styles from './StepForm.module.scss';
import { Button } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

interface DashboardStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const DashboardStep: React.FC<DashboardStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'DashboardStep');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Onboarding complete!');
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
              <p>Congratulations! You have successfully completed the onboarding process.</p>
              <p>Your community is now set up and ready to go. Click the button below to access your dashboard.</p>
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
                Go to Dashboard
              </Button>
            </div>
      </form>
    </GenericStepWrapper>
  );
};

export default DashboardStep;
