'use client';

import React, { useState } from 'react';
import { AnimatedTitle } from '@/components/ui';
import styles from './FormBase.module.scss';
import ButtonUI from '../ui/Button';
import { cards } from '../wizardData';

interface DashboardFormProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const DashboardForm: React.FC<DashboardFormProps> = ({
  onNext,
  onPrev,
  currentStep = 5,
  totalSteps = 5,
}) => {
  const stepData = cards[4]; // DashboardForm is the fifth card (index 4)

  const [setupComplete, setSetupComplete] = useState(false);

  const handleFinish = () => {
    setSetupComplete(true);
    console.log('Community setup completed!');
    onNext?.(); // This will close the dialog
  };

  const handleBack = () => {
    onPrev?.();
  };

  const handleSkip = () => {
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.topSection}>
        <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
        <AnimatedTitle
          text={stepData.title}
          subtitle={stepData.description}
          size="medium"
          className={styles.animatedTitle}
        />
      </div>

      {/* Middle Section: Summary and final steps */}
      <div className={styles.middleSection}>
          <h3 className={styles.summaryTitle}>🎉 Your Community is Ready!</h3>
          <div className={styles.nextSteps}>
            <h4 className={styles.nextStepsTitle}>What's Next?</h4>
            <ul className={styles.stepsList}>
              <li>Access your community dashboard</li>
              <li>Customize your community theme</li>
              <li>Start engaging with your members</li>
              <li>Create your first posts and events</li>
            </ul>
          </div>            
      </div>

      {/* Bottom Section: Action buttons */}
      <div className={styles.bottomSection}>
        <div className={styles.actionRow}>
          <ButtonUI 
            variant="outline-only" 
            size="medium" 
            onClick={handleBack} 
            fullWidth
          >
            Back
          </ButtonUI>
          <ButtonUI 
            variant="primary" 
            size="medium" 
            onClick={handleFinish}
            fullWidth
          >
            Launch
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;
