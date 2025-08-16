import React from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';

interface BaseStepFormProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
  title?: string;
  subtitle?: string;
}

const BaseStepForm: React.FC<BaseStepFormProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps,
  title = "Form Step",
  subtitle = "Please fill out this form"
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>{title}</h2>
      
      <div className={styles.formControls}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="field1"
                name="field1"
                placeholder="Enter information"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="field2"
                name="field2"
                placeholder="Enter more information"
                required
              />
            </div>
            
            <div className={styles.actionRow}>
              {currentStep > 1 && (
                <Button 
                  variant="outline-only" 
                  size="medium" 
                  onClick={onPrev}
                  fullWidth
                >
                  Back
                </Button>
              )}
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
        </div>
      </div>
    </div>
  );
};

export default BaseStepForm;
