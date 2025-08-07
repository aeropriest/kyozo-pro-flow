'use client';

import React from 'react';
import styles from './Toolkit.module.scss';

interface ToolkitProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const Toolkit: React.FC<ToolkitProps> = ({
  title = 'CreativeLab',
  subtitle = 'Your creative toolkit',
  description = 'Explore a dynamic resources hub where creativity meets community. Here you\'ll find a curated collection of articles, videos and resources designed to inspire, inform and ignite your creative journey.',
  ctaText = 'Check out CreativeLab',
  ctaUrl = '#'
}) => {
  return (
    <section className={styles.toolkit}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.subtitle}>{subtitle}</h3>
        </div>
        
        <div className={styles.rightColumn}>
          <p className={styles.description}>{description}</p>
          <a href={ctaUrl} className={styles.cta}>
            {ctaText} <span className={styles.arrow}>→</span>
          </a>
        </div>
      </div>
      
      <div className={styles.bubbleContainer}>
        <div className={styles.bubble}>
          <span>Social Media</span>
        </div>
        <div className={styles.notText}>We are not</div>
      </div>
    </section>
  );
};

export default Toolkit;
