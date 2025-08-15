'use client';

import React, { useState } from 'react';
import styles from './Steps.module.scss';

const CommunityDetailsStep: React.FC = () => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [communityType, setCommunityType] = useState('public');

  return (
    <div className={styles.stepContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="community-name">Community Name</label>
          <input
            type="text"
            id="community-name"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            placeholder="Enter your community name"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="community-description">Community Description</label>
          <textarea
            id="community-description"
            value={communityDescription}
            onChange={(e) => setCommunityDescription(e.target.value)}
            placeholder="Describe what your community is about"
            rows={4}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Community Type</label>
          <div className={styles.radioGroup}>
            <div className={styles.radioOption}>
              <input
                type="radio"
                id="public"
                name="community-type"
                value="public"
                checked={communityType === 'public'}
                onChange={() => setCommunityType('public')}
              />
              <label htmlFor="public">
                <span className={styles.radioTitle}>Public</span>
                <span className={styles.radioDescription}>Anyone can view and join</span>
              </label>
            </div>
            <div className={styles.radioOption}>
              <input
                type="radio"
                id="private"
                name="community-type"
                value="private"
                checked={communityType === 'private'}
                onChange={() => setCommunityType('private')}
              />
              <label htmlFor="private">
                <span className={styles.radioTitle}>Private</span>
                <span className={styles.radioDescription}>Only invited members can join</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailsStep;
