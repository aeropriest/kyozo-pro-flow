import React, { useState } from 'react';
import styles from './CustomForm.module.scss';
import { Input, Toggle } from '@/components/ui';
import CustomForm, { FormField } from './CustomForm';
import { cards } from '../wizardData';

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
  
  // Find the step data from cards
  const stepIndex = cards.findIndex(step => step.component === 'CommunityDetailsStep');

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
    } else if (communityName.length < 3) {
      setNameError('Community name must be at least 3 characters');
      isValid = false;
    }
    
    // Validate community description
    if (!communityDescription.trim()) {
      setDescriptionError('Community description is required');
      isValid = false;
    } else if (communityDescription.length < 10) {
      setDescriptionError('Please provide a more detailed description (at least 10 characters)');
      isValid = false;
    }
    
    // Validate color selection
    if (!selectedColor) {
      setColorError('Please select a theme color');
      isValid = false;
    }
    
    // Force re-render to show errors if validation fails
    if (!isValid) {
      setNameError(nameError => nameError ? nameError : '');
      setDescriptionError(descError => descError ? descError : '');
      setColorError(colorErr => colorErr ? colorErr : '');
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Community details submitted:', {
        communityName,
        communityDescription,
        isPrivate: !isPublic,
        selectedColor
      });
      
      // Don't call onNext here, CustomForm will handle it
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
          <h3 className={styles.sectionTitle}>Community Information</h3>
          <FormField>
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
          </FormField>
          <FormField>
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
          </FormField>
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
    </CustomForm>
  );
};

export default CommunityDetailsStep;
