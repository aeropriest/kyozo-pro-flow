import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';

interface AvatarStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const AvatarStep: React.FC<AvatarStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [avatarName, setAvatarName] = useState('');
  const [avatarBio, setAvatarBio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Avatar data:', { avatarName, avatarBio });
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>Set Your Avatar</h2>
      
      <div className={styles.formControls}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="avatarName"
                name="avatarName"
                value={avatarName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvatarName(e.target.value)}
                placeholder="Display Name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="avatarBio"
                name="avatarBio"
                value={avatarBio}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvatarBio(e.target.value)}
                placeholder="Short Bio"
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
