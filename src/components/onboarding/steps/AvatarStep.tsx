'use client';

import React, { useState } from 'react';
import styles from './Steps.module.scss';
import { IoMdCloudUpload } from 'react-icons/io';

const AvatarStep: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.avatarContainer}>
        <div 
          className={styles.avatarPreview}
          style={avatarPreview ? { backgroundImage: `url(${avatarPreview})` } : {}}
        >
          {!avatarPreview && (
            <div className={styles.avatarPlaceholder}>
              <IoMdCloudUpload size={40} />
              <span>Upload Photo</span>
            </div>
          )}
        </div>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleAvatarChange}
          className={styles.fileInput}
        />
        <label htmlFor="avatar-upload" className={styles.uploadButton}>
          Choose Image
        </label>
        
        <div className={styles.avatarOptions}>
          <p>Or select from our gallery:</p>
          <div className={styles.avatarGallery}>
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num} 
                className={styles.avatarOption}
                onClick={() => setAvatarPreview(`/avatar-${num}.jpg`)}
              >
                <img src={`/avatar-${num}.jpg`} alt={`Avatar option ${num}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarStep;
