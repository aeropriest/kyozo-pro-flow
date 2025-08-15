'use client';

import React, { useState } from 'react';
import styles from './Steps.module.scss';
import { IoMdCloudUpload } from 'react-icons/io';

const CommunitySettingsStep: React.FC = () => {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [allowComments, setAllowComments] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label>Community Banner</label>
          <div 
            className={styles.bannerPreview}
            style={bannerPreview ? { backgroundImage: `url(${bannerPreview})` } : {}}
          >
            {!bannerPreview && (
              <div className={styles.bannerPlaceholder}>
                <IoMdCloudUpload size={40} />
                <span>Upload Banner Image</span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="banner-upload"
            accept="image/*"
            onChange={handleBannerChange}
            className={styles.fileInput}
          />
          <label htmlFor="banner-upload" className={styles.uploadButton}>
            Choose Banner
          </label>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="primary-color">Primary Color</label>
          <div className={styles.colorPickerContainer}>
            <input
              type="color"
              id="primary-color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className={styles.colorPicker}
            />
            <span className={styles.colorValue}>{primaryColor}</span>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label>Community Rules</label>
          <div className={styles.toggleOption}>
            <span>Allow Comments</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={allowComments}
                onChange={() => setAllowComments(!allowComments)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.toggleOption}>
            <span>Require Approval for New Members</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={requireApproval}
                onChange={() => setRequireApproval(!requireApproval)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySettingsStep;
