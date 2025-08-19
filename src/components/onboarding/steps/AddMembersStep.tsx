'use client';

import React, { useState } from 'react';
import { Input, Checkbox, Tabs } from '@/components/ui';
import styles from './AddMembersStep.module.scss';

interface MemberData {
  emails: string;
  inviteMessage: string;
  sendAutomatically: boolean;
}

interface AddMembersStepProps {
  onNext?: () => void;
  onMembersUpdate?: (data: MemberData) => void;
}

const AddMembersStep: React.FC<AddMembersStepProps> = ({ onNext, onMembersUpdate }) => {
  const [importMethod, setImportMethod] = useState('manual');
  const [formData, setFormData] = useState<MemberData>({
    emails: '',
    inviteMessage: '',
    sendAutomatically: false
  });
  const [errors, setErrors] = useState<Partial<MemberData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof MemberData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, sendAutomatically: e.target.checked }));
  };

  const validateEmails = (emailText: string) => {
    const emailLines = emailText.split('\n').filter(line => line.trim());
    const emailRegex = /\S+@\S+\.\S+/;
    
    for (const email of emailLines) {
      if (!emailRegex.test(email.trim())) {
        return false;
      }
    }
    return true;
  };

  const validateForm = () => {
    const newErrors: Partial<MemberData> = {};
    let isValid = true;

    if (importMethod === 'manual') {
      if (!formData.emails.trim()) {
        newErrors.emails = 'At least one email address is required';
        isValid = false;
      } else if (!validateEmails(formData.emails)) {
        newErrors.emails = 'Please enter valid email addresses';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Members Data:', formData);
      onMembersUpdate?.(formData);
      onNext?.();
    }
  };

  return (
    <div className={styles.membersContainer}>
      <div className={styles.formFields}>
        <div className={styles.methodTabs}>
          <button
            type="button"
            onClick={() => setImportMethod('manual')}
            className={`${styles.methodTab} ${importMethod === 'manual' ? styles.active : ''}`}
          >
            Manual
          </button>
          <button
            type="button"
            onClick={() => setImportMethod('csv')}
            className={`${styles.methodTab} ${importMethod === 'csv' ? styles.active : ''}`}
          >
            CSV Import
          </button>
          <button
            type="button"
            onClick={() => setImportMethod('eventbrite')}
            className={`${styles.methodTab} ${importMethod === 'eventbrite' ? styles.active : ''}`}
          >
            Eventbrite
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          {importMethod === 'manual' && (
            <div className={styles.manualSection}>
              <div className={styles.formGroup}>
                <div className={styles.textareaWrapper}>
                  <label htmlFor="emails" className={styles.textareaLabel}>
                    Email Addresses
                  </label>
                  <textarea
                    id="emails"
                    name="emails"
                    rows={4}
                    placeholder="Enter email addresses, one per line"
                    value={formData.emails}
                    onChange={handleInputChange}
                    className={`${styles.textarea} ${errors.emails ? styles.hasError : ''}`}
                  />
                  {errors.emails && (
                    <div className={styles.errorMessage}>{errors.emails}</div>
                  )}
                  <p className={styles.helpText}>Separate multiple email addresses with a new line</p>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <div className={styles.textareaWrapper}>
                  <label htmlFor="inviteMessage" className={styles.textareaLabel}>
                    Invitation Message
                  </label>
                  <textarea
                    id="inviteMessage"
                    name="inviteMessage"
                    rows={3}
                    placeholder="Add a personal message to your invitation..."
                    value={formData.inviteMessage}
                    onChange={handleInputChange}
                    className={styles.textarea}
                  />
                </div>
              </div>
            </div>
          )}

          {importMethod === 'csv' && (
            <div className={styles.csvSection}>
              <div className={styles.dropZone}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.uploadIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className={styles.dropText}>
                  Drag and drop your CSV file here, or
                  <button type="button" className={styles.browseButton}>
                    browse
                  </button>
                </p>
                <p className={styles.helpText}>
                  CSV file should include columns for name and email
                </p>
              </div>
              
              <div className={styles.checkboxGroup}>
                <Checkbox
                  id="send-invites"
                  name="sendAutomatically"
                  checked={formData.sendAutomatically}
                  onChange={handleCheckboxChange}
                  label="Send invitation emails automatically"
                />
              </div>
            </div>
          )}

          {importMethod === 'eventbrite' && (
            <div className={styles.eventbriteSection}>
              <div className={styles.connectCard}>
                <p className={styles.connectText}>
                  Connect your Eventbrite account to import attendees from your events.
                </p>
                <button type="button" className={styles.eventbriteButton}>
                  Connect Eventbrite
                </button>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.selectLabel}>Select Event</label>
                <select className={styles.select}>
                  <option value="" disabled>Select an event</option>
                  <option value="event1">Connect to Eventbrite first</option>
                </select>
              </div>
            </div>
          )}
        </form>
        
        <div className={styles.membersSummary}>
          <div className={styles.summaryContent}>
            <div className={styles.memberCount}>
              <span className={styles.count}>0</span> members will be invited
            </div>
            <button type="button" className={styles.previewButton}>
              Preview List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMembersStep;
