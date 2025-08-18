import React, { useState } from 'react';
import styles from './CustomForm.module.scss';
import { Input } from '@/components/ui';
import CustomForm from './CustomForm';

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
    <CustomForm
      title={title}
      description={subtitle}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
      onSubmit={handleSubmit}
      stepIndex={0} // This is a placeholder, should be replaced with actual step index
    >
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
      {/* Action buttons are handled by CustomForm */}
    </CustomForm>
  );
};

export default BaseStepForm;
