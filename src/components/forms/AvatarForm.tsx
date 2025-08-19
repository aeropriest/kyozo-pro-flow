'use client';

import React, { useState } from 'react';
import { Button, Input, Checkbox, Tabs, AnimatedTitle } from '@/components/ui';
import styles from './AvatarForm.module.scss';
import ButtonUI from '../ui/Button';
import { cards } from '../wizardData';

interface AvatarFormProps {
  onSignIn?: (data: { email: string; password: string }) => void;
  onSignUp?: (data: { fullName: string; email: string; password: string }) => void;
  onGoogleSignIn?: () => void;
  onNext?: () => void;
  currentStep?: number;
  totalSteps?: number;
  description?: string;
}

const AvatarForm: React.FC<AvatarFormProps> = ({
  onSignIn,
  onSignUp,
  onGoogleSignIn,
  onNext,
  currentStep = 1,
  totalSteps = 6,
  description,
}) => {
  // Get the step data from the cards array
  const stepData = cards[1]; // AvatarForm is the first card (index 0)

  const [avatarName, setAvatarName] = useState('');
  const [avatarBio, setAvatarBio] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [nameError, setNameError] = useState('');
  const [bioError, setBioError] = useState('');
  const [avatarError, setAvatarError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setNameError('');
    setBioError('');
    setAvatarError('');
    
    // Validate name
    if (!avatarName.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
    
    // Validate bio
    if (!avatarBio.trim()) {
      setBioError('Bio is required');
      isValid = false;
    }
    
    // Validate avatar selection
    if (!selectedAvatar && !customAvatar) {
      setAvatarError('Please select an avatar');
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Avatar data:', { 
        avatarName, 
        avatarBio, 
        selectedAvatar: customAvatar || selectedAvatar 
      });
      onNext?.();
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setCustomAvatar(null);
    if (avatarError) setAvatarError('');
  };


  const handleSkip = () => {
    onNext?.();
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomAvatar(result);
        setSelectedAvatar(null);
        if (avatarError) setAvatarError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    // Navigate to previous step or close dialog
    console.log('Back button clicked');
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('Avatar data:', { 
        avatarName, 
        avatarBio, 
        selectedAvatar: customAvatar || selectedAvatar 
      });
      onNext?.();
    }
  };

  return (
    <div className={styles.AvatarContainer}>
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
            
              <form onSubmit={handleSubmit} noValidate>
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
              <textarea
                id="avatarBio"
                name="avatarBio"
                value={avatarBio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setAvatarBio(e.target.value);
                  if (bioError) setBioError('');
                }}
                placeholder="Tell us about yourself..."
                className={`${styles.bioTextarea} ${bioError ? styles.error : ''}`}
                rows={3}
                required
              />
              {bioError && <span className={styles.errorText}>{bioError}</span>}
            </div>
            
            {/* Avatar Selection */}
            <div className={styles.formGroup}>
              <label className={styles.sectionLabel}>Choose Your Avatar</label>
              <div className={styles.avatarSelection}>
                {/* Predefined avatars */}
                <div className={styles.avatarOptions}>
                  {['./Parallax1.jpg', './Parallax2.jpg', './Parallax3.jpg','./Parallax4.jpg'].map((avatar, index) => (
                    <div
                      key={index}
                      className={`${styles.avatarOption} ${selectedAvatar === avatar ? styles.selected : ''}`}
                      onClick={() => handleAvatarSelect(avatar)}
                    >
                      <img src={avatar} alt={`Avatar ${index + 1}`} className={styles.avatarImage} />
                    </div>
                  ))}
                  
                  {/* Custom avatar upload */}
                  <div className={`${styles.avatarOption} ${styles.uploadOption} ${customAvatar ? styles.selected : ''}`}>
                    <input
                      type="file"
                      id="avatarUpload"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className={styles.hiddenInput}
                    />
                    <label htmlFor="avatarUpload" className={styles.uploadLabel}>
                      {customAvatar ? (
                        <img src={customAvatar} alt="Custom avatar" className={styles.avatarImage} />
                      ) : (
                        <div className={styles.plusIcon}>+</div>
                      )}
                    </label>
                  </div>
                </div>
                {avatarError && <span className={styles.errorText}>{avatarError}</span>}
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

export default AvatarForm;
