'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui';
import styles from './CommunityDetailsStep.module.scss';

interface CommunityData {
  communityName: string;
  communityDescription: string;
  communityType: 'public' | 'private' | 'invite-only';
}

interface CommunityDetailsStepProps {
  onNext?: () => void;
  onCommunityUpdate?: (data: CommunityData) => void;
}

const CommunityDetailsStep: React.FC<CommunityDetailsStepProps> = ({ onNext, onCommunityUpdate }) => {
  const [formData, setFormData] = useState<CommunityData>({
    communityName: '',
    communityDescription: '',
    communityType: 'public'
  });
  const [errors, setErrors] = useState<Partial<CommunityData>>({});
  const [logoUrl, setLogoUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof CommunityData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTypeChange = (type: 'public' | 'private' | 'invite-only') => {
    setFormData(prev => ({ ...prev, communityType: type }));
  };

  const validateForm = () => {
    const newErrors: Partial<CommunityData> = {};
    let isValid = true;

    if (!formData.communityName.trim()) {
      newErrors.communityName = 'Community name is required';
      isValid = false;
    }

    if (!formData.communityDescription.trim()) {
      newErrors.communityDescription = 'Community description is required';
      isValid = false;
    } else if (formData.communityDescription.length < 20) {
      newErrors.communityDescription = 'Description must be at least 20 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Community Data:', formData);
      onCommunityUpdate?.(formData);
      onNext?.();
    }
  };

  const communityTypes = [
    {
      id: 'public',
      title: 'Public',
      description: 'Anyone can view, join, and participate'
    },
    {
      id: 'private',
      title: 'Private',
      description: 'Only members can view and participate'
    },
    {
      id: 'invite-only',
      title: 'Invite Only',
      description: 'Members can join by invitation only'
    }
  ];

  return (
    <div className={styles.communityContainer}>
      <div className={styles.formFields}>
        <div className={styles.logoSection}>
          <div className={styles.logoWrapper}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Community logo" 
                className={styles.logo}
              />
            ) : (
              <div className={styles.logoPlaceholder}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.logoIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            )}
            
            <button type="button" className={styles.uploadButton}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.uploadIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className={styles.uploadText}>Upload a community logo</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.formGroup}>
            <Input
              type="text"
              id="communityName"
              name="communityName"
              value={formData.communityName}
              onChange={handleInputChange}
              placeholder="Community Name"
              error={errors.communityName}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <div className={styles.textareaWrapper}>
              <label htmlFor="communityDescription" className={styles.textareaLabel}>
                Community Description
              </label>
              <textarea
                id="communityDescription"
                name="communityDescription"
                rows={3}
                placeholder="Describe what your community is about..."
                value={formData.communityDescription}
                onChange={handleInputChange}
                className={`${styles.textarea} ${errors.communityDescription ? styles.hasError : ''}`}
              />
              {errors.communityDescription && (
                <div className={styles.errorMessage}>{errors.communityDescription}</div>
              )}
            </div>
          </div>
          
          <div className={styles.typeSection}>
            <label className={styles.typeLabel}>Community Type</label>
            <div className={styles.typeOptions}>
              {communityTypes.map((type) => (
                <div key={type.id} className={styles.typeOption}>
                  <input
                    id={type.id}
                    name="communityType"
                    type="radio"
                    checked={formData.communityType === type.id}
                    onChange={() => handleTypeChange(type.id as 'public' | 'private' | 'invite-only')}
                    className={styles.radioInput}
                  />
                  <label htmlFor={type.id} className={styles.typeOptionLabel}>
                    <span className={styles.typeTitle}>{type.title}</span>
                    <span className={styles.typeDescription}>{type.description}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityDetailsStep;
