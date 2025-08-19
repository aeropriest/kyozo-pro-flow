'use client';

import React, { useState } from 'react';
import { Button, Input, TextArea, AnimatedTitle } from '@/components/ui';
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
    
    // Validate community type
    if (!communityType) {
      setTypeError('Please select a community type');
      isValid = false;
    }
    
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('Community data:', { 
        communityName, 
        communityDescription, 
        communityType,
        isPrivate 
      });
      onNext?.();
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
          size="medium"
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
                  placeholder="Describe your community's purpose and goals..."
                  error={descriptionError}
                  rows={3}
                  required
                />
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
                <div className={styles.privacyToggle}>
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className={styles.checkbox}
                    />
                    <span className={styles.toggleText}>Make this community private</span>
                  </label>
                  <p className={styles.privacyDescription}>
                    Private communities require approval to join and are not visible in public searches.
                  </p>
                </div>
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
