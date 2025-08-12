'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './BackgroundImages.module.scss';

const BackgroundImages = () => {
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    // Animation for left image
    if (leftImageRef.current) {
      leftImageRef.current.classList.add(styles.animateLeft);
    }
    
    // Animation for right image
    if (rightImageRef.current) {
      rightImageRef.current.classList.add(styles.animateRight);
    }
    
    // Check for theme changes
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsLightTheme(theme === 'light');
    };
    
    // Initial check
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      {/* Dark background for dark theme */}
      <div className={`${styles.darkBackground} ${!isLightTheme ? styles.visible : ''}`} />
      {/* Tiled light background for light theme */}
      <div className={`${styles.tiledBackground} ${isLightTheme ? styles.visible : ''}`} />
      
      <div ref={leftImageRef} className={styles.leftImage}>
        <Image 
          src="/left-top.png" 
          alt="Decorative background element" 
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <div ref={rightImageRef} className={styles.rightImage}>
        <Image 
          src="/right-top.png" 
          alt="Decorative background element" 
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
};

export default BackgroundImages;
