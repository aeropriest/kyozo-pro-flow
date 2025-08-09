'use client';
import React from 'react';
import PotteryVideo from '../../components/PotteryVideo';
import VideoWall from '../../components/VideoWall';
import styles from './page.module.scss';

export default function PotteryDemoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pottery Video Demo</h1>
        <p className={styles.description}>
          A demonstration of the PotteryVideo component with rounded rectangle styling
        </p>
      </div>

      <div className={styles.videoSection}>
        <div className={styles.videoGrid}>
          {/* Default size */}
          <div className={styles.videoItem}>
            <h3>Default Size (400x300)</h3>
            <PotteryVideo />
          </div>

          {/* Large size */}
          <div className={styles.videoItem}>
            <h3>Large Size (600x400)</h3>
            <PotteryVideo 
              width="600px" 
              height="400px" 
            />
          </div>

          {/* Small size with controls */}
          <div className={styles.videoItem}>
            <h3>Small Size with Controls (300x200)</h3>
            <PotteryVideo 
              width="300px" 
              height="200px" 
              controls={true}
            />
          </div>

          {/* Custom styling */}
          <div className={styles.videoItem}>
            <h3>Custom Styled (500x350)</h3>
            <PotteryVideo 
              width="500px" 
              height="350px" 
              className={styles.customVideo}
            />
          </div>
        </div>
      </div>

      <div className={styles.videoWallSection}>
        <h2 className={styles.sectionTitle}>Original Video Wall</h2>
        <p className={styles.sectionDescription}>
          The original VideoWall component with scrolling animation and multiple video sources
        </p>
        
        <div className={styles.originalVideoWall}>
          <VideoWall />
        </div>
      </div>

      <div className={styles.footer}>
        <p>All videos feature rounded rectangle borders and smooth hover effects</p>
      </div>
    </div>
  );
}
