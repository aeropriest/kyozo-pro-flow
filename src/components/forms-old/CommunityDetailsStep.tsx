import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input, Toggle } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

interface CommunityDetailsStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const CommunityDetailsStep: React.FC<CommunityDetailsStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#6366F1'); // Default color
  
  // Error states
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [colorError, setColorError] = useState('');
  
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'CommunityDetailsStep');

  // Available theme colors
  const themeColors = [
    '#6366F1', // Indigo
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F59E0B', // Amber
    '#8B5CF6', // Violet
    '#10B981', // Emerald
  ];

  // Handle input changes with error clearing
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityName(e.target.value);
    if (nameError) setNameError('');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityDescription(e.target.value);
    if (descriptionError) setDescriptionError('');
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (colorError) setColorError('');
  };

  const handlePrivacyToggle = () => {
    setIsPublic(!isPublic);
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setNameError('');
    setDescriptionError('');
    setColorError('');
    
    // Validate community name
    if (!communityName.trim()) {
      setNameError('Community name is required');
      isValid = false;
    }
    
    // Validate community description
    if (!communityDescription.trim()) {
      setDescriptionError('Community description is required');
      isValid = false;
    }
    
    // Validate color selection
    if (!selectedColor) {
      setColorError('Please select a theme color');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Community details:', { 
        communityName, 
        communityDescription,
        isPublic,
        themeColor: selectedColor
      });
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
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <Input
              type="text"
              id="communityName"
              name="communityName"
              value={communityName}
              onChange={handleNameChange}
              placeholder="Community Name"
              error={nameError}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              id="communityDescription"
              name="communityDescription"
              value={communityDescription}
              onChange={handleDescriptionChange}
              placeholder="Community Description"
              error={descriptionError}
              required
            />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label className={styles.settingLabel}>Privacy Setting</label>
            <div className={styles.privacyToggle}>
              <span className={isPublic ? styles.activeOption : ''}>Public</span>
              <Toggle 
                checked={!isPublic} 
                onChange={handlePrivacyToggle} 
                id="privacy-toggle"
              />
              <span className={!isPublic ? styles.activeOption : ''}>Private</span>
            </div>
            <p className={styles.settingDescription}>
              {isPublic 
                ? 'Anyone can discover and join your community' 
                : 'Only invited members can join your community'}
            </p>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.settingLabel}>Theme Color</label>
            <div className={styles.colorGrid}>
              {themeColors.map((color, index) => (
                <div 
                  key={index}
                  className={`${styles.colorOption} ${selectedColor === color ? styles.selectedColor : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
            {colorError && <div className={styles.errorMessage}>{colorError}</div>}
          </div>
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
            onClick={() => {
              const event = new Event('submit') as unknown as React.FormEvent;
              handleSubmit(event);
            }}
            fullWidth
          >
            Next
          </Button>
        </div>
      </form>
    </GenericStepWrapper>
  );
};

export default CommunityDetailsStep;
