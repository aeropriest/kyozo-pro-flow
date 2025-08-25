'use client';

import React, { useState } from 'react';
import { Button, Input, TextArea, AnimatedTitle } from '@/components/ui';
import styles from './FormBase.module.scss';
import ButtonUI from '../ui/Button';
import { cards } from '../wizardData';

interface AddMembersFormProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const AddMembersForm: React.FC<AddMembersFormProps> = ({
  onNext,
  onPrev,
  currentStep = 4,
  totalSteps = 5,
}) => {
  const stepData = cards[3]; // AddMembersForm is the fourth card (index 3)

  const [inviteMethod, setInviteMethod] = useState('email');
  const [emailList, setEmailList] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [eventbriteUrl, setEventbriteUrl] = useState('');
  const [emailError, setEmailError] = useState('');
  const [csvError, setCsvError] = useState('');
  const [eventbriteError, setEventbriteError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setEmailError('');
    setCsvError('');
    setEventbriteError('');
    
    if (inviteMethod === 'email' && !emailList.trim()) {
      setEmailError('Please enter at least one email address');
      isValid = false;
    }
    
    if (inviteMethod === 'csv' && !csvFile) {
      setCsvError('Please select a CSV file');
      isValid = false;
    }
    
    if (inviteMethod === 'eventbrite' && !eventbriteUrl.trim()) {
      setEventbriteError('Please enter an Eventbrite URL');
      isValid = false;
    }
    
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('Members data:', { 
        inviteMethod, 
        emailList, 
        csvFile: csvFile?.name,
        eventbriteUrl 
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

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      if (csvError) setCsvError('');
    } else {
      setCsvError('Please select a valid CSV file');
    }
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
              {/* Invite Method Selection */}
              <div className={styles.formGroup}>
                <div className={styles.methodSelection}>
                <div
                    className={`${styles.methodOption} ${inviteMethod === 'eventbrite' ? styles.selected : ''}`}
                    onClick={() => setInviteMethod('eventbrite')}
                  >
                    <div className={styles.methodIcon}>🎫</div>
                    <span>Eventbrite</span>
                  </div>                  <div
                    className={`${styles.methodOption} ${inviteMethod === 'csv' ? styles.selected : ''}`}
                    onClick={() => setInviteMethod('csv')}
                  >
                    <div className={styles.methodIcon}>📄</div>
                    <span>CSV Import</span>
                  </div>

                </div>
              </div>

              {/* Email Method */}
              

              {/* CSV Method */}
              {inviteMethod === 'csv' && (
                <div className={styles.formGroup}>
                  <div className={styles.fileUpload}>
                    <input
                      type="file"
                      id="csvUpload"
                      accept=".csv"
                      onChange={handleCsvUpload}
                      className={styles.hiddenInput}
                    />
                    <label htmlFor="csvUpload" className={styles.uploadLabel}>
                      {csvFile ? (
                        <span>📄 {csvFile.name}</span>
                      ) : (
                        <span>📄 Choose CSV File</span>
                      )}
                    </label>
                    {csvError && <span className={styles.errorText}>{csvError}</span>}
                  </div>
                </div>
              )}
              {/* Eventbrite Method */}
              {inviteMethod === 'eventbrite' && (
                <div className={styles.formGroup}>
                  <Input
                    type="url"
                    id="eventbriteUrl"
                    name="eventbriteUrl"
                    value={eventbriteUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEventbriteUrl(e.target.value);
                      if (eventbriteError) setEventbriteError('');
                    }}
                    placeholder="https://www.eventbrite.com/e/your-event-id"
                    error={eventbriteError}
                  />
                </div>
              )}
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

export default AddMembersForm;
