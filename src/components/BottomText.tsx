'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import ZoomText from './ZoomText';
import { colors } from '../lib/colors.generated';

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
  const words = text.split(' ');
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{
      minHeight: '80vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: colors.pageBackground, // Using centralized color system - page background
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Container for shapes */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 1,
        pointerEvents: 'none' // Allow clicks to pass through
      }}>
        {/* Left shape */}
        <div style={{
          width: '20%',
          height: '20vh',
          position: 'relative'
        }}>
          <Image 
            src="/bottom-left.png" 
            alt="Left decoration" 
            fill 
            style={{
              objectFit: 'contain',
              objectPosition: 'left bottom',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }} 
          />
        </div>
        
        {/* Right shape */}
        <div style={{
          width: '20%',
          height: '20vh',
          position: 'relative'
        }}>
          <Image 
            src="/bottom-right.png" 
            alt="Right decoration" 
            fill 
            style={{
              objectFit: 'contain',
              objectPosition: 'right bottom',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }} 
          />
        </div>
      </div>
      
      {/* Main text with zoom effect */}
      <div style={{ margin: '0 0 2rem 0', zIndex: 2 }}>
        <ZoomText 
          text={text}
          fontSize={fontSize}
          fontWeight={fontWeight}
          duration="500ms"
          delay="300ms"
        />
      </div>
      
      {/* Button */}
      <div style={{
        marginTop: '1rem',
        marginBottom: '4rem',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        transitionDelay: '0.5s',
        zIndex: 2
      }}>
        <Button variant="primary" href="#">
          Join the waitlist
        </Button>
      </div>
      
      {/* Copyright */}
      <div style={{
        width: '100%',
        color: colors.textDark, // Using centralized color system - primary('dark-text-color')
        marginTop: '4rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
        transitionDelay: '0.7s',
        zIndex: 2,
      }}>
        Copyright © {new Date().getFullYear()} Kyozo. All rights reserved.
      </div>
    </div>
  );
};

export default BottomText;