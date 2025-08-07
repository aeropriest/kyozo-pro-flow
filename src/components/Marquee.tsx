'use client';

import React, { ReactNode } from 'react';
import styles from './Marquee.module.scss';
import { FaCircleCheck } from "react-icons/fa6";


// Export class names for use in parent components
export const marqueeClasses = {
  text: styles.marqueeText,
  image: styles.marqueeImage
};

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
            <FaCircleCheck size={24}/>
            {child}
          </div>
        ))}
        {childrenArray.map((child, index) => (
          <div key={`clone-${index}`} className={styles.marqueeItem} aria-hidden="true">
            <FaCircleCheck size={24}/>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
