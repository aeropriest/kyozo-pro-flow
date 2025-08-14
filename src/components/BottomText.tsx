'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import ZoomText from './ZoomText';
import styles from './BottomText.module.scss';

interface BottomTextProps {
  text?: string;
  fontSize?: string;
  fontWeight?: number;
}

const BottomText: React.FC<BottomTextProps> = ({
  text = 'Join the Kyozo creative universe',
  fontSize = '6rem',
  fontWeight = 700
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles.container}>
      {/* Container for shapes */}
      <div className={styles.shapesContainer}>
        {/* Left shape */}
        <div className={styles.leftShape}>
          <Image 
            src="/bottom-left.png" 
            alt="Left decoration" 
            width={200}
            height={200}
            className={isLoaded ? styles.imageLoaded : styles.imageLoading}
            style={{
              objectFit: 'contain',
              objectPosition: 'left bottom'
            }} 
          />
        </div>
        
        {/* Right shape */}
        <div className={styles.rightShape}>
          <Image 
            src="/bottom-right.png" 
            alt="Right decoration" 
            width={200}
            height={200}
            className={isLoaded ? styles.imageLoaded : styles.imageLoading}
            style={{
              objectFit: 'contain',
              objectPosition: 'right bottom'
            }} 
          />
        </div>
      </div>
      
      {/* Main text with zoom effect */}
      <div className={styles.mainText}>
        <ZoomText 
          text={text}
          fontSize={fontSize}
          fontWeight={fontWeight}
          duration="500ms"
          delay="300ms"
        />
      </div>
      
      {/* Button */}
      <div className={`${styles.buttonContainer} ${isLoaded ? styles.loaded : styles.loading}`}>
        <Button 
          variant="accent-border" 
          size="large" 
          href="#"
        >
          Join the waitlist
        </Button>
      </div>
      
      {/* Copyright */}
      <div className={`${styles.copyright} ${isLoaded ? styles.loaded : styles.loading}`}>
        Copyright © {new Date().getFullYear()} Kyozo. All rights reserved.
      </div>
    </div>
  );
};

export default BottomText;
