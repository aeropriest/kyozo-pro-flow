import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';

interface AvatarStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
  description?: string;
}

const AvatarStep: React.FC<AvatarStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps,
  description
}) => {
  const [avatarName, setAvatarName] = useState('');
  const [avatarBio, setAvatarBio] = useState('');
  const [nameError, setNameError] = useState('');
  const [bioError, setBioError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setNameError('');
    setBioError('');
    
    // Validate display name
    if (!avatarName.trim()) {
      setNameError('Please fill out this field');
      isValid = false;
    }
    
    // Validate bio
    if (!avatarBio.trim()) {
      setBioError('Please fill out this field');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Avatar data:', { avatarName, avatarBio });
      onNext?.();
    }
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>Set Your Avatar</h2>
      {description && <p className={styles.cardDescription}>{description}</p>}
      
      <div className={styles.formControls}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="avatarName"
                name="avatarName"
                value={avatarName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAvatarName(e.target.value);
                  if (nameError) setNameError('');
                }}
                placeholder="Display Name"
                error={nameError}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="avatarBio"
                name="avatarBio"
                value={avatarBio}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAvatarBio(e.target.value);
                  if (bioError) setBioError('');
                }}
                placeholder="Short Bio"
                error={bioError}
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
        </div>
      </div>
    </div>
  );
};

export default AvatarStep;
