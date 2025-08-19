'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui';
import styles from './ProfileForm.module.scss';

interface ProfileData {
  fullName: string;
  bio: string;
  interests: string[];
}

interface ProfileFormProps {
  onNext?: () => void;
  onProfileUpdate?: (data: ProfileData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onNext, onProfileUpdate }) => {
  const [formData, setFormData] = useState<ProfileData>({
    fullName: '',
    bio: '',
    interests: []
  });
  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [avatarUrl, setAvatarUrl] = useState('');

  const availableInterests = ['Technology', 'Design', 'Business', 'Marketing', 'Education', 'Health', 'Finance', 'Travel'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof ProfileData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<ProfileData> = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
      isValid = false;
    } else if (formData.bio.length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Profile Data:', formData);
      onProfileUpdate?.(formData);
      onNext?.();
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.formFields}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Profile avatar" 
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.avatarIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            <button type="button" className={styles.uploadButton}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.uploadIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className={styles.uploadText}>Upload a profile picture</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.formGroup}>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Your Full Name"
              error={errors.fullName}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <div className={styles.textareaWrapper}>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                placeholder="Tell us a little about yourself..."
                value={formData.bio}
                onChange={handleInputChange}
                className={`${styles.textarea} ${errors.bio ? styles.hasError : ''}`}
              />
              {errors.bio && (
                <div className={styles.errorMessage}>{errors.bio}</div>
              )}
            </div>
          </div>
          
          <div className={styles.interestsSection}>
            <label className={styles.interestsLabel}>Interests</label>
            <div className={styles.interestsGrid}>
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`${styles.interestTag} ${formData.interests.includes(interest) ? styles.selected : ''}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
