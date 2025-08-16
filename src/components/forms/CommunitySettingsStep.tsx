import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';

interface CommunitySettingsStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const CommunitySettingsStep: React.FC<CommunitySettingsStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [privacySetting, setPrivacySetting] = useState('');
  const [themeColor, setThemeColor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Community settings:', { privacySetting, themeColor });
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>Community Settings</h2>
      
      <div className={styles.formControls}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="privacySetting"
                name="privacySetting"
                value={privacySetting}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrivacySetting(e.target.value)}
                placeholder="Privacy Setting (Public/Private)"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="themeColor"
                name="themeColor"
                value={themeColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setThemeColor(e.target.value)}
                placeholder="Theme Color"
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

export default CommunitySettingsStep;
