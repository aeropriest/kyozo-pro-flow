'use client';
import React from 'react';
import styles from './FeatureCard.module.scss';
import Button from './Button';
import Image from 'next/image';
import shapeStyles from '@/app/demo/shapes.module.scss';

const FeatureCard = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.backgroundGradient}>
        <div className={styles.phoneBackgroundGradient}></div>
      </div>
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
        
        <div className={styles.rightContent}>
          <Image src="/iphone.png" alt="Phone" width={400} height={800} className={styles.phoneImage} />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
