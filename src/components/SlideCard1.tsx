'use client';
import React from 'react';
import styles from './SlideCard1.module.scss';
import Image from 'next/image';
import Button from './Button';

interface SlideCard1Props {
  className?: string;
}

const SlideCard1: React.FC<SlideCard1Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <p className={styles.categoryLabel}>COMMUNITY ACCESS</p>
          <h2 className={styles.cardTitle}>Engage with visionary communities</h2>
          <p className={styles.cardDescription}>
            Join and interact with diverse communities, from niche artistic circles to industry-leading collectives. Engage with passionate individuals who share your creative interests.
          </p>
          <div>
            <Button variant="outline-only" href="#">Join the waitlist</Button>
          </div>
        </div>
        <div className={styles.rightContent}>
          <Image src="/image_mosaic.png" alt="Phone" width={800} height={800} />
        </div>
      </div>      
    </div>
  );
};

export default SlideCard1;
