'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { useInView } from 'react-intersection-observer';

interface ZoomTextProps {
  text: string;
  fontSize?: string;
  fontWeight?: number;
  duration?: string;
  delay?: string;
}

const ZoomText: React.FC<ZoomTextProps> = ({
  text,
  fontSize = '6rem',
  fontWeight = 700,
  duration = '500ms',
  delay = '0ms'
}) => {
  // Use intersection observer to detect when element is in view
  const { ref, inView } = useInView({
    /* Only trigger once */
    triggerOnce: true,
    /* Element is considered in view when 20% is visible */
    threshold: 0.2
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const words = text.split(' ');
  
  useEffect(() => {
    // Only trigger animation when element is in view
    if (inView) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div 
      ref={ref} // Add ref for intersection observer
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <h1 style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: 'center',
        maxWidth: '1200px',
        padding: '0 2rem',
        margin: 0,
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
        opacity: isLoaded ? 1 : 0.3, // Start at 30% opacity
        transform: isLoaded ? 'scale(1)' : 'scale(0.1)',
        transition: `transform ${duration} ease-out ${delay}, opacity ${duration} ease-out ${delay}`,
        transformOrigin: 'center center'
      }}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: 'inline-block', margin: '0 0.5rem' }}>
            {word.split('').map((letter, letterIndex) => (
              <span
                key={`${wordIndex}-${letterIndex}`}
                style={{
                  display: 'inline-block',
                  color: 'var(--text-primary)'
                }}
              >
                {letter}
              </span>
            ))}
            {/* Add a space after each word except the last one */}
            {wordIndex < words.length - 1 && <span style={{ display: 'inline-block', width: '0.3rem' }}></span>}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default ZoomText;
