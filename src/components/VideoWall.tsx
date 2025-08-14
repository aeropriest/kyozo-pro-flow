'use client';
import React from 'react';
import styles from './VideoWall.module.scss';

const VideoWall: React.FC = () => {
  // Simulated video thumbnails with background colors instead of images
  const videos = [
    { id: 1, color: '#3b82f6' },
    { id: 2, color: '#10b981' },
    { id: 3, color: '#8b5cf6' },
    { id: 4, color: '#f43f5e' },
    { id: 5, color: '#f97316' },
    { id: 6, color: '#06b6d4' },
  ];

  return (
    <div className={styles.videoWallContainer}>
      <div className={styles.videoGrid}>
        {videos.map((video) => (
          <div key={video.id} className={styles.videoItem}>
            <div 
              className={styles.videoThumbnail} 
              style={{ backgroundColor: video.color }}
            >
              <div className={styles.playButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoWall;
