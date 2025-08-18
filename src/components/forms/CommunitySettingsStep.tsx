import React, { useState } from 'react';
import styles from './CustomForm.module.scss';
import { Input } from '@/components/ui';
import CustomForm from './CustomForm';
import { cards } from '../wizardData';

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
  
  // Error states
  const [privacyError, setPrivacyError] = useState('');
  const [themeError, setThemeError] = useState('');
  
  // Find the step data from cards
  const stepIndex = cards.findIndex(step => step.component === 'CommunitySettingsStep');

  // Handle input changes with error clearing
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacySetting(e.target.value);
    if (privacyError) setPrivacyError('');
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeColor(e.target.value);
    if (themeError) setThemeError('');
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setPrivacyError('');
    setThemeError('');
    
    // Validate privacy setting
    if (!privacySetting.trim()) {
      setPrivacyError('Privacy setting is required');
      isValid = false;
    }
    
    // Validate theme color
    if (!themeColor.trim()) {
      setThemeError('Theme color is required');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Community settings:', { privacySetting, themeColor });
      onNext?.();
    }
  };

  return (
    <CustomForm
      stepIndex={stepIndex}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
      onSubmit={handleSubmit}
    >
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
              <Input
                type="text"
                id="privacySetting"
                name="privacySetting"
                value={privacySetting}
                onChange={handlePrivacyChange}
                placeholder="Privacy Setting (Public/Private)"
                error={privacyError}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="themeColor"
                name="themeColor"
                value={themeColor}
                onChange={handleThemeChange}
                placeholder="Theme Color"
                error={themeError}
                required
              />
            </div>
        </div>
    </CustomForm>
  );
};

export default CommunitySettingsStep;
