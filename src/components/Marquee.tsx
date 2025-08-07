'use client';

import React, { ReactNode } from 'react';
import styles from './Marquee.module.scss';

// Export class names for use in parent components
export const marqueeClasses = {
  text: styles.marqueeText,
  image: styles.marqueeImage
};

// Checkmark icon component
const CheckmarkIcon = () => (
  <svg className={styles.checkmarkIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
  </svg>
);

interface MarqueeProps {
  children: ReactNode;
  duration?: string;
  reverse?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({ children, duration = '40s', reverse = false }) => {
  const animationClass = reverse ? styles.marqueeReverse : styles.marquee;
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={styles.marqueeContainer}>
      <div
        className={`${styles.marqueeContent} ${animationClass}`}
        style={{ animationDuration: duration }}
      >
        {/* Render children twice for a seamless loop */}
        {childrenArray.map((child, index) => (
          <div key={index} className={styles.marqueeItem}>
            <CheckmarkIcon />
            {child}
          </div>
        ))}
        {childrenArray.map((child, index) => (
          <div key={`clone-${index}`} className={styles.marqueeItem} aria-hidden="true">
            <CheckmarkIcon />
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
