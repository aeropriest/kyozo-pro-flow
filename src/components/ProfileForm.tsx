'use client';

import React, { useState } from 'react';
import { Button, Input } from '@/components/ui';
import styles from './ProfileForm.module.scss';
import { cards } from './wizardData';
import Image from 'next/image';
import ButtonUI from './ui/Button';

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
  
  const [profileForm, setProfileForm] = useState({ displayName: '', bio: '' });
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  
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
    if (profileErrors.avatar) {
      setProfileErrors(prev => ({ ...prev, avatar: '' }));
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

    if (selectedAvatar === null) {
      errors.avatar = 'Please select a profile image';
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
        avatar: selectedAvatar !== null ? `parallax-${selectedAvatar}` : ''
      });
      onNext?.(); // Go to next step
    } else {
      // Scroll to the first error
      const firstErrorElement = document.querySelector(`.${styles.errorMessage}`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Parallax images for avatar selection - limited to 3 as requested
  const parallaxImages = [
    '/Parallax1.jpg',
    '/Parallax2.jpg',
    '/Parallax3.jpg',
  ];

  // File input reference for custom avatar upload
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real implementation, we would handle the file upload here
      // For now, just set the selected avatar to a special index (3) to indicate custom upload
      setSelectedAvatar(3);
      if (profileErrors.avatar) {
        setProfileErrors(prev => ({ ...prev, avatar: '' }));
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>Its About You</h2>
      <p className={styles.cardDescription}>Add your details and select a profile image that represents you. This will be visible to other members of your community.</p>      
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
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
        </div>
        
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Choose Your Profile Image</h3>
          <div className={styles.avatarCircleGrid}>
            {parallaxImages.map((image, index) => (
              <div 
                key={index} 
                className={`${styles.avatarCircle} ${selectedAvatar === index ? styles.selected : ''}`}
                onClick={() => handleAvatarSelect(index)}
              >
                <Image 
                  src={image} 
                  alt={`Profile image option ${index + 1}`} 
                  width={80} 
                  height={80} 
                  className={styles.avatarImage}
                />
              </div>
            ))}
            
            {/* Add a plus circle for custom upload */}
            <div 
              className={`${styles.avatarCircle} ${styles.uploadCircle} ${selectedAvatar === 3 ? styles.selected : ''}`}
              onClick={handleFileUpload}
            >
              <span className={styles.plusIcon}>+</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className={styles.hiddenFileInput} 
              />
            </div>
          </div>
          
          {profileErrors.avatar && (
            <div className={styles.errorMessage}>{profileErrors.avatar}</div>
          )}
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
            type="submit"
            fullWidth
          >
            Next
          </ButtonUI>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
