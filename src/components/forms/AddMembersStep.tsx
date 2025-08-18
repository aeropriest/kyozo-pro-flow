import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

interface AddMembersStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const AddMembersStep: React.FC<AddMembersStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('');
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');
  
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'AddMembersStep');

  // Handle input changes with error clearing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberRole(e.target.value);
    if (roleError) setRoleError('');
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setEmailError('');
    setRoleError('');
    
    // Validate email
    if (!memberEmail.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(memberEmail)) {
      setEmailError('Invalid email format');
      isValid = false;
    }
    
    // Validate role
    if (!memberRole.trim()) {
      setRoleError('Role is required');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Member details:', { memberEmail, memberRole });
      onNext?.();
    }
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
                type="email"
                id="memberEmail"
                name="memberEmail"
                value={memberEmail}
                onChange={handleEmailChange}
                placeholder="Member Email"
                error={emailError}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="memberRole"
                name="memberRole"
                value={memberRole}
                onChange={handleRoleChange}
                placeholder="Member Role"
                error={roleError}
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

export default AddMembersStep;
