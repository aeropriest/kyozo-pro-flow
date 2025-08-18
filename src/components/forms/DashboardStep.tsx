import React from 'react';
import styles from './CustomForm.module.scss';
import CustomForm from './CustomForm';
import { cards } from '../wizardData';

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
  // Find the step data from cards
  const stepIndex = cards.findIndex(step => step.component === 'DashboardStep');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Onboarding complete!');
    onNext?.();
  };

  return (
    <CustomForm
      stepIndex={stepIndex}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
      onSubmit={handleSubmit}
      submitButtonText="Go to Dashboard"
    >
      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <p>Congratulations! You have successfully completed the onboarding process.</p>
          <p>Your community is now set up and ready to go. Click the button below to access your dashboard.</p>
        </div>
        
        <div className={styles.dashboardSummary}>
          <h3 className={styles.sectionTitle}>Community Setup Complete</h3>
          <ul className={styles.setupSummary}>
            <li className={styles.summaryItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Profile created</span>
            </li>
            <li className={styles.summaryItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Community details configured</span>
            </li>
            <li className={styles.summaryItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Members added</span>
            </li>
          </ul>
        </div>
      </div>
    </CustomForm>
  );
};

export default DashboardStep;
