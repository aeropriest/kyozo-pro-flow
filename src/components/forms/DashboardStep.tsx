import React from 'react';
import styles from './StepForm.module.scss';
import { Button } from '@/components/ui';

interface DashboardStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
  description?: string;
}

const DashboardStep: React.FC<DashboardStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps,
  description
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Onboarding complete!');
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>Onboarding Complete!</h2>
      
      <div className={styles.formControls}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <p>Congratulations! You have successfully completed the onboarding process.</p>
              <p>Your community is now set up and ready to go. Click the button below to access your dashboard.</p>
            </div>
            {description && <p className={styles.cardDescription}>{description}</p>}
            
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
        </div>
      </div>
    </div>
  );
};

export default DashboardStep;
