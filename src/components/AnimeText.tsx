'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { colors } from '../lib/colors.generated';
import { useInView } from 'react-intersection-observer';

interface AnimeTextProps {
  text: string;
  fontSize?: string;
  fontWeight?: number;
}

const AnimeText: React.FC<AnimeTextProps> = ({ text, fontSize = '7rem', fontWeight = 800 }) => {
  // Use intersection observer to detect when element is in view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const words = text.split(' ');
  
  useEffect(() => {
    // Only trigger animation when element is in view
    if (inView) {
      setIsLoaded(true);
    }
  }, [inView]);

  return (
    <div 
      ref={ref} // Add ref for intersection observer
      style={{
        height: '80vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--color-dark-gray)',
        position: 'relative'
      }}>
      <h1 style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: 'center',
        maxWidth: '1200px',
        padding: '0 2rem',
        margin: 0
      }}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: 'inline-block', margin: '0 0.5rem' }}>
            {word.split('').map((letter, letterIndex) => {
              const letterStyle: CSSProperties = {
                display: 'inline-block',
                color: 'var(--color-gray)', // Initial gray color
                transition: 'color 0.5s ease',
                transitionDelay: `${(wordIndex * word.length + letterIndex) * 0.05}s`,
                ...(isLoaded && { color: colors.textDark }) // Using centralized color system - primary('dark-text-color')
              };
              
              return (
                <span
                  key={`${wordIndex}-${letterIndex}`}
                  style={letterStyle}
                >
                  {letter}
                </span>
              );
            })}
            {/* Add a space after each word except the last one */}
            {wordIndex < words.length - 1 && <span style={{ display: 'inline-block', width: '0.3rem' }}></span>}
          </span>
        ))}

      </h1>
    </div>
  );
};

export default AnimeText;
