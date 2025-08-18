'use client';

import React, { ReactNode, useState } from 'react';
import { Button, AnimatedTitle } from '@/components/ui';
import styles from './CustomForm.module.scss';
import { cards } from '../wizardData';

// FormField component for consistent form field styling
export const FormField: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className={styles.formField}>
      {children}
    </div>
  );
};

interface CustomFormProps {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  onNext?: () => void;
  onPrev?: () => void;
  currentStep?: number;
  totalSteps?: number;
  submitButtonText?: string;
  backButtonText?: string;
  showBackButton?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  stepIndex?: number;
  formError?: string;
}

const CustomForm: React.FC<CustomFormProps> = ({
  children,
  title,
  description,
  image,
  onNext,
  onPrev,
  currentStep = 1,
  totalSteps = 6,
  submitButtonText = 'Continue',
  backButtonText = 'Back',
  showBackButton = true,
  onSubmit,
  stepIndex = 0,
  formError,
}) => {
  // Get the step data from the cards array if stepIndex is provided
  const stepData = stepIndex !== undefined ? cards[stepIndex] : null;
  
  // Use provided title/description or fallback to stepData if available
  const displayTitle = title || (stepData ? stepData.title : '');
  const displayDescription = description || (stepData ? stepData.description : '');
  const displayImage = image || (stepData ? stepData.image : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Background image */}
      {displayImage && (
        <div 
          className={styles.formBackground} 
          style={{ backgroundImage: `url(${displayImage})` }}
        />
      )}
      
      {/* Step indicator */}
      {currentStep && totalSteps && (
        <div className={styles.stepIndicator}>
          Step {currentStep} of {totalSteps}
        </div>
      )}
      
      <div className={styles.formContent}>
        {/* Title and description */}
        <div className={styles.formHeader}>
          {displayTitle && (
            <div className={styles.animatedTitle}>
              <AnimatedTitle text={displayTitle} />
            </div>
          )}
          {displayDescription && (
            <p className={styles.cardDescription}>{displayDescription}</p>
          )}
        </div>
        
        {/* Form controls */}
        <div className={styles.formControls}>
          <form onSubmit={handleSubmit}>
            {/* Display form-level error if present */}
            {formError && (
              <div className={styles.formErrorContainer}>
                <div className={styles.formError}>{formError}</div>
              </div>
            )}
            {children}
            
            <div className={styles.actionRow}>
              {showBackButton && onPrev && (
                <Button 
                  variant="outline-only" 
                  onClick={onPrev}
                  type="button"
                >
                  {backButtonText}
                </Button>
              )}
              <Button 
                variant="primary" 
                type="submit"
              >
                {submitButtonText}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;
