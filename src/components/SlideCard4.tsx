'use client';
import React from 'react';
import styles from './SlideCard4.module.scss';
import Button from './Button';
import Image from 'next/image';
import shapeStyles from '@/app/demo/shapes.module.scss';

interface SlideCard4Props {
  className?: string;
}

const SlideCard4: React.FC<SlideCard4Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <h2 className={styles.cardTitle}>Connect.Explore.Engage.</h2>
          <p className={styles.cardDescription}>
            Connect with visionary creators and forward-thinking communities.
          </p>
          <div>
            <Button variant="outline-only" href="#">Join the waitlist</Button>
          </div>
        </div>
        <div className={styles.rightContent}>
          <Image src="/iphone.png" alt="Phone" width={800} height={800} />
        </div>
      </div>
      <div className={styles.backgroundGradient}>
        <div className={`${shapeStyles.shapeDemo} ${shapeStyles.phoneBackgroundGradient}`}></div>
      </div>      
    </div>
  );
};

export default SlideCard4;
