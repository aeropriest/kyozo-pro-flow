import React, { useState } from 'react';
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
  // Add state for form fields and errors
  const [formData, setFormData] = useState({ field1: '', field2: '' });
  const [formErrors, setFormErrors] = useState({ field1: '', field2: '' });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = { field1: '', field2: '' };
    let isValid = true;

    if (!formData.field1.trim()) {
      errors.field1 = 'This field is required';
      isValid = false;
    }

    if (!formData.field2.trim()) {
      errors.field2 = 'This field is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext?.();
    }
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
                value={formData.field1}
                onChange={handleInputChange}
                placeholder="Enter information"
                error={formErrors.field1}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="field2"
                name="field2"
                value={formData.field2}
                onChange={handleInputChange}
                placeholder="Enter more information"
                error={formErrors.field2}
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
