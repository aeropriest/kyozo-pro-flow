'use client';

import React, { useState } from 'react';
import { Button, Input, Checkbox, Tabs, AnimatedTitle } from '@/components/ui';
import styles from './ProfileForm.module.scss';
import ButtonUI from './ui/Button';
import Image from 'next/image';
import { cards } from './wizardData';


interface ProfileFormProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep?: number;
  totalSteps?: number;
  description?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onNext,
  onPrev,
  currentStep = 2,
  totalSteps = 6,
  description,
}) => {
  // Get the step data from the cards array
  const stepData = cards[1]; // ProfileForm is the second card (index 1)
  
  const [activeTab, setActiveTab] = useState<'profile' | 'avatar'>('profile');
  const [profileForm, setProfileForm] = useState({ displayName: '', bio: '' });
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [customAvatar, setCustomAvatar] = useState<File | null>(null);
  const [customAvatarPreview, setCustomAvatarPreview] = useState<string | null>(null);
  
  // Error states for form validation
  const [profileErrors, setProfileErrors] = useState({ displayName: '', bio: '', avatar: '' });

  // Handle form input changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (profileErrors[name as keyof typeof profileErrors]) {
      setProfileErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle avatar selection
  const handleAvatarSelect = (index: number) => {
    setSelectedAvatar(index);
    setCustomAvatar(null);
    setCustomAvatarPreview(null);
    if (profileErrors.avatar) {
      setProfileErrors(prev => ({ ...prev, avatar: '' }));
    }
  };

  // Handle custom avatar upload
  const handleCustomAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomAvatar(file);
      setSelectedAvatar(null);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      if (profileErrors.avatar) {
        setProfileErrors(prev => ({ ...prev, avatar: '' }));
      }
    }
  };

  // Validate profile form
  const validateProfileForm = () => {
    const errors = { displayName: '', bio: '', avatar: '' };
    let isValid = true;

    if (!profileForm.displayName.trim()) {
      errors.displayName = 'Display name is required';
      isValid = false;
    }

    if (!profileForm.bio.trim()) {
      errors.bio = 'Bio is required';
      isValid = false;
    }

    if (selectedAvatar === null && !customAvatar) {
      errors.avatar = 'Please select an avatar';
      isValid = false;
    }

    setProfileErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateProfileForm()) {
      console.log('Profile data:', { 
        ...profileForm, 
        avatar: selectedAvatar !== null ? `preset-${selectedAvatar}` : 'custom',
        customAvatar: customAvatar
      });
      onNext?.(); // Go to next step
    }
  };

  // Predefined avatar images
  const avatarOptions = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    '/avatars/avatar4.png',
  ];

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>{stepData.title}</h2>
      <p className={styles.cardSubtitle}>{stepData.subtitle}</p>
      <p className={styles.cardDescription}>{stepData.description}</p>
      
      <div className={styles.formControls}>
        <Tabs
          tabs={['Profile Info', 'Choose Avatar']}
          activeTab={activeTab === 'profile' ? 0 : 1}
          onTabChange={(index) => setActiveTab(index === 0 ? 'profile' : 'avatar')}
          className={styles.tabs}
        />

        <div className={styles.formContent}>
          {activeTab === 'profile' ? (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <Input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profileForm.displayName}
                  onChange={handleProfileChange}
                  placeholder="Display Name"
                  error={profileErrors.displayName}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <Input
                  type="text"
                  id="bio"
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  placeholder="Short Bio"
                  error={profileErrors.bio}
                  required
                />
              </div>
              
              <div className={styles.actionRow}>
                <ButtonUI 
                  variant="outline-only" 
                  size="medium" 
                  onClick={onPrev}
                  fullWidth
                >
                  Back
                </ButtonUI>
                <ButtonUI 
                  variant="outline-only" 
                  size="medium" 
                  onClick={() => {
                    // Validate profile fields before proceeding to avatar tab
                    const errors = { displayName: '', bio: '', avatar: '' };
                    let isValid = true;

                    if (!profileForm.displayName.trim()) {
                      errors.displayName = 'Display name is required';
                      isValid = false;
                    }

                    if (!profileForm.bio.trim()) {
                      errors.bio = 'Bio is required';
                      isValid = false;
                    }

                    setProfileErrors(errors);
                    
                    if (isValid) {
                      setActiveTab('avatar');
                    }
                  }}
                  fullWidth
                >
                  Next
                </ButtonUI>
              </div>
            </form>
          ) : (
            <div>
              <div className={styles.avatarSelection}>
                {avatarOptions.map((avatar, index) => (
                  <div 
                    key={index} 
                    className={`${styles.avatarOption} ${selectedAvatar === index ? styles.selected : ''}`}
                    onClick={() => handleAvatarSelect(index)}
                  >
                    <Image 
                      src={avatar} 
                      alt={`Avatar option ${index + 1}`} 
                      width={80} 
                      height={80} 
                      className={styles.avatarImage}
                    />
                  </div>
                ))}
                <div className={styles.avatarOption}>
                  <label htmlFor="customAvatar" className={styles.customAvatarLabel}>
                    {customAvatarPreview ? (
                      <Image 
                        src={customAvatarPreview} 
                        alt="Custom avatar" 
                        width={80} 
                        height={80} 
                        className={styles.avatarImage}
                      />
                    ) : (
                      <div className={styles.uploadIcon}>+</div>
                    )}
                    <input 
                      type="file" 
                      id="customAvatar" 
                      accept="image/*"
                      onChange={handleCustomAvatarUpload}
                      className={styles.hiddenInput}
                    />
                  </label>
                </div>
              </div>
              
              {profileErrors.avatar && (
                <div className={styles.errorMessage}>{profileErrors.avatar}</div>
              )}
              
              <div className={styles.actionRow}>
                <ButtonUI 
                  variant="outline-only" 
                  size="medium" 
                  onClick={() => setActiveTab('profile')}
                  fullWidth
                >
                  Back
                </ButtonUI>
                <ButtonUI 
                  variant="outline-only" 
                  size="medium" 
                  onClick={() => {
                    const event = new Event('submit') as unknown as React.FormEvent;
                    handleSubmit(event);
                  }}
                  fullWidth
                >
                  Next
                </ButtonUI>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
