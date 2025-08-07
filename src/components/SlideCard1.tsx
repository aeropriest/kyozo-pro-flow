'use client';
import React from 'react';
import styles from './SlideCard1.module.scss';
import Button from './Button';
import Image from 'next/image';
// Import shape styles from demo directory
import shapeStyles from '../app/demo/shapes.module.scss';

interface SlideCard1Props {
  className?: string;
}

const SlideCard1: React.FC<SlideCard1Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <h2 className={styles.cardTitle}>Engage with visionary communities</h2>
          <p className={styles.cardDescription}>
            Join and interact with diverse communities, from niche artistic circles to industry-leading collectives. Engage with passionate individuals who share your creative interests.
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

export default SlideCard1;
