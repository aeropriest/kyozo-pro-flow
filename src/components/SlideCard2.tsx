'use client';
import React from 'react';
// import styles from './SlideCard2.module.scss';
import styles from './SlideCardStyle.module.scss';

import Image from 'next/image';
import Button from './Button';

interface SlideCard2Props {
  className?: string;
}

const SlideCard2: React.FC<SlideCard2Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <p className={styles.categoryLabel}>CREATOR TOOLS</p>
          <h2 className={styles.cardTitle}>Grow your creative community</h2>
          <p className={styles.cardDescription}>
            Are you a creative professional, community organizer, or small business owner working within the creative industries?
            We understand the challenges of nurturing and growing a dedicated audience, so we built KyozoPro, a comprehensive platform that enhances genuine connections and unlocks new opportunities.
          </p>
          <div>
            <Button variant="outline-only" href="#">Join the waitlist</Button>
          </div>
        </div>
        <div className={styles.rightContent}>
          <Image src="/card-3.png" alt="Phone" width={800} height={800} />
        </div>
      </div>      
    </div>
  );
};

export default SlideCard2;
