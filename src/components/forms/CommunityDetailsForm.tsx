'use client';

import React, { useState } from 'react';
import { Button, Input, TextArea, AnimatedTitle } from '@/components/ui';
import CustomCheckbox from '@/components/ui/Checkbox';
import styles from './FormBase.module.scss';
import ButtonUI from '../ui/Button';
import { cards } from '../wizardData';

interface CommunityDetailsFormProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const CommunityDetailsForm: React.FC<CommunityDetailsFormProps> = ({
  onNext,
  onPrev,
  currentStep = 3,
  totalSteps = 5,
}) => {
  const stepData = cards[2]; // CommunityDetailsForm is the third card (index 2)

  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [communityType, setCommunityType] = useState('');
  const [communityColor, setCommunityColor] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [typeError, setTypeError] = useState('');

  const communityTypes = [
    'Professional Network',
    'Social Club',
    'Educational Group',
    'Hobby Community',
    'Business Network',
    'Support Group'
  ];

  // Color options based on marquee colors
  const colorOptions = [
    {
      name: 'Music Blue',
      value: 'music',
      color: 'rgb(0, 112, 243)',
      gradient: 'linear-gradient(135deg, rgb(0, 112, 243) 0%, rgb(0, 90, 200) 100%)'
    },
    {
      name: 'Art Purple',
      value: 'artMovements',
      color: 'rgb(138, 43, 226)',
      gradient: 'linear-gradient(135deg, rgb(138, 43, 226) 0%, rgb(120, 30, 200) 100%)'
    },
    {
      name: 'Craft Orange',
      value: 'crafts',
      color: 'rgb(255, 140, 0)',
      gradient: 'linear-gradient(135deg, rgb(255, 140, 0) 0%, rgb(230, 120, 0) 100%)'
    },
    {
      name: 'Fashion Pink',
      value: 'fashion',
      color: 'rgb(255, 105, 180)',
      gradient: 'linear-gradient(135deg, rgb(255, 105, 180) 0%, rgb(230, 80, 160) 100%)'
    },
    {
      name: 'Performance Teal',
      value: 'performance',
      color: 'rgb(64, 224, 208)',
      gradient: 'linear-gradient(135deg, rgb(64, 224, 208) 0%, rgb(50, 200, 190) 100%)'
    }
  ];

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setNameError('');
    setDescriptionError('');
    setTypeError('');
    
    // Validate community name
    if (!communityName.trim()) {
      setNameError('Community name is required');
      isValid = false;
    }
    
    // Validate description
    if (!communityDescription.trim()) {
      setDescriptionError('Community description is required');
      isValid = false;
    }
    
    // Note: communityType validation removed since the field is commented out in the UI
    
    return isValid;
  };

  const handleNext = () => {
    console.log('🔵 CommunityDetailsForm: handleNext called');
    console.log('🔵 Form validation starting...');
    
    const isValid = validateForm();
    console.log('🔵 Form validation result:', isValid);
    
    if (isValid) {
      console.log('🔵 Form is valid, proceeding with next step');
      console.log('🔵 Community data:', { 
        communityName, 
        communityDescription, 
        communityType,
        communityColor,
        isPrivate 
      });
      console.log('🔵 onNext callback exists:', !!onNext);
      console.log('🔵 Calling onNext...');
      onNext?.();
      console.log('🔵 onNext called successfully');
    } else {
      console.log('🔴 Form validation failed, not proceeding');
    }
  };

  const handleBack = () => {
    onPrev?.();
  };

  const handleSkip = () => {
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.topSection}>
        <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
        <AnimatedTitle
          text={stepData.title}
          subtitle={stepData.description}
          size="large"
          className={styles.animatedTitle}
        />
      </div>

      {/* Middle Section: Form controls */}
      <div className={styles.middleSection}>
        <div className={styles.formControls}>
          <div className={styles.formContent}>
            <form noValidate>
              <div className={styles.formGroup}>
                <Input
                  type="text"
                  id="communityName"
                  name="communityName"
                  value={communityName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCommunityName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="Community Name"
                  error={nameError}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <TextArea
                  id="communityDescription"
                  name="communityDescription"
                  value={communityDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setCommunityDescription(e.target.value);
                    if (descriptionError) setDescriptionError('');
                  }}
                  placeholder="Community Description"
                  error={descriptionError}
                  rows={3}
                  required
                />
              </div>

              {/* Community Color Selection */}
              <div className={styles.formGroup}>
                <label className={styles.sectionLabel}>Choose Your Community Color</label>
                <div className={styles.colorSelection}>
                  {colorOptions.map((colorOption, index) => (
                    <div
                      key={index}
                      className={`${styles.colorOption} ${communityColor === colorOption.value ? styles.selected : ''}`}
                      onClick={() => setCommunityColor(colorOption.value)}
                      style={{
                        background: colorOption.gradient,
                        border: communityColor === colorOption.value ? `3px solid ${colorOption.color}` : '2px solid transparent'
                      }}
                      title={colorOption.name}
                    >
                      <div className={styles.colorName}>{colorOption.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Type Selection */}
              {/* <div className={styles.formGroup}>
                <label className={styles.sectionLabel}>Community Type</label>
                <div className={styles.typeSelection}>
                  {communityTypes.map((type, index) => (
                    <div
                      key={index}
                      className={`${styles.typeOption} ${communityType === type ? styles.selected : ''}`}
                      onClick={() => {
                        setCommunityType(type);
                        if (typeError) setTypeError('');
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
                {typeError && <span className={styles.errorText}>{typeError}</span>}
              </div> */}

              {/* Privacy Setting */}
              <div className={styles.formGroup}>
                <CustomCheckbox
                  id="isPrivate"
                  name="isPrivate"
                  label={
                    <div>
                      <span>Make this community private</span>
                      <p className={styles.privacyDescription}>
                        Private communities require approval to join and are not visible in public searches.
                      </p>
                    </div>
                  }
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section: Action buttons */}
      <div className={styles.bottomSection}>
        <div className={styles.actionRow}>
          <ButtonUI 
            variant="outline-only" 
            size="medium" 
            onClick={handleBack} 
            fullWidth
          >
            Back
          </ButtonUI>
          <ButtonUI 
            variant="outline-only" 
            size="medium" 
            onClick={handleSkip}
            fullWidth
          >
            Skip
          </ButtonUI>
          <ButtonUI 
            variant="outline-only" 
            size="medium" 
            onClick={handleNext}
            fullWidth
          >
            Next
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailsForm;
