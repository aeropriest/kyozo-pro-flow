'use client';

import React from 'react';
import styles from '../forms/StepForm.module.scss';
import { OnboardingStep } from './onboardingSteps';

interface GenericStepWrapperProps {
  step: OnboardingStep;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrev?: () => void;
  children: React.ReactNode;
}

/**
 * A generic wrapper component for onboarding steps that displays the step metadata
 * from onboardingSteps.ts and renders the specific form component as children.
 */
const GenericStepWrapper: React.FC<GenericStepWrapperProps> = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  children
}) => {
  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>{step.title}</h2>
      {step.description && <p className={styles.cardDescription}>{step.description}</p>}
      
      <div className={styles.formControls}>
        <div className={styles.formContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default GenericStepWrapper;
