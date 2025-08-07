'use client';
import React from 'react';
import styles from './SlideCard0.module.scss';
import Button from './Button';
import Image from 'next/image';
// Import shape styles from demo directory
import shapeStyles from '../app/demo/shapes.module.scss';

interface SlideCard0Props {
  className?: string;
}

const SlideCard0: React.FC<SlideCard0Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <h2 className={styles.cardTitle}>Exclusive access and insights</h2>
          <p className={styles.cardDescription}>
            Experience the creative world through an insider's lens. Kyozo is an eco-system of creative communities - that gives you exclusive access to updates and insights from the creative luminaries driving cultural evolution.
          </p>
          <div>
            <Button variant="outline-only" href="#">Join the waitlist</Button>
          </div>
        </div>
        
        <div className={styles.phoneContainer}>
          <Image src="/card-3.png" alt="Phone" width={400} height={800} className={styles.phoneImage} />
        </div>
      </div>
      <div className={styles.backgroundGradient}>
        <div className={`${shapeStyles.shapeDemo} ${shapeStyles.phoneBackgroundGradient}`}></div>
      </div>      
    </div>
  );
};

export default SlideCard0;
