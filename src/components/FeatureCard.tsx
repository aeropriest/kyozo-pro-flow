'use client';
import React from 'react';
import styles from './FeatureCard.module.scss';
import Button from './Button';
import Image from 'next/image';
// Import shapes styles from the demo directory
import shapeStyles from '../app/demo/shapes.module.scss';

interface FeatureCardProps {
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <h2 className={styles.cardTitle}>Connect. Explore. Engage.</h2>
          <p className={styles.cardDescription}>
            Connect with visionary creators and forward-thinking communities.
          </p>
          <div>
            <Button variant="outline-only" href="#">Join the waitlist</Button>
          </div>
        </div>
        
        <div className={styles.phoneContainer}>
          <Image src="/iphone.png" alt="Phone" width={400} height={800} className={styles.phoneImage} />
        </div>
      </div>
      <div className={styles.backgroundGradient}>
        <div className={`${shapeStyles.shapeDemo} ${shapeStyles.phoneBackgroundGradient}`}></div>
      </div>      
    </div>
  );
};

export default FeatureCard;
