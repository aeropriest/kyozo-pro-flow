'use client';
import React from 'react';
import styles from './SlideCard2.module.scss';
import Button from './Button';
import Image from 'next/image';
import shapeStyles from '../app/demo/shapes.module.scss';

interface SlideCard2Props {
  className?: string;
}

const SlideCard2: React.FC<SlideCard2Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <h2 className={styles.cardTitle}>Grow your creative community</h2>
          <p className={styles.cardDescription}>
            Are you a creative professional, community organizer, or small business owner working within the creative industries?
            We understand the challenges of nurturing and growing a dedicated audience, so we built KyozoPro, a comprehensive platform that enhances genuine connections and unlocks new opportunities. KyozoPro's advanced tools streamline your workflow, so you can focus on what truly matters - growing your creative passion and community.
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

export default SlideCard2;
