'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import styles from './ScrollRevealText.module.scss';

interface ScrollRevealTextProps {
  text: string;
  fontSize?: string;
  fontWeight?: number;
  threshold?: number; // How much of the element needs to be visible to start animation
  revealSpeed?: number; // Controls how fast text reveals with scroll
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  fontSize = '8rem',
  fontWeight = 800,
  threshold = 0.3,
  revealSpeed = 1.0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1 progress value
  const words = text.split(' ');
  const totalLetters = words.reduce((acc, word) => acc + word.length, 0) + words.length - 1;
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is through the viewport
      // Start when element enters viewport from bottom
      // End when element is about to leave viewport from top
      const elementHeight = rect.height;
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Calculate visible percentage (0 when element just enters viewport, 1 when it's about to leave)
      let visiblePercentage = 0;
      
      if (elementBottom <= 0) {
        // Element has scrolled past the top
        visiblePercentage = 1;
      } else if (elementTop >= windowHeight) {
        // Element hasn't entered viewport yet
        visiblePercentage = 0;
      } else {
        // Element is partially visible
        const totalScrollDistance = windowHeight + elementHeight;
        const scrolledDistance = windowHeight - elementTop;
        visiblePercentage = Math.min(Math.max(scrolledDistance / totalScrollDistance, 0), 1);
      }
      
      // Apply revealSpeed factor and make text fully revealed at 70% scroll
      // Scale the progress so that 0.7 becomes 1.0 (fully revealed)
      const scaledProgress = Math.min(visiblePercentage / 0.9, 1);
      const adjustedProgress = Math.pow(scaledProgress, 1 / revealSpeed);
      setScrollProgress(adjustedProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealSpeed]);

  return (
    <div 
      ref={containerRef}
      className={styles.scrollRevealContainer}
    >
      <h1 className={styles.scrollRevealText} style={{
        fontSize: fontSize,
        fontWeight: fontWeight
      }}>
        {words.map((word, wordIndex) => {
          // Calculate the starting letter index for this word in the overall text
          const previousWordsLetterCount = words
            .slice(0, wordIndex)
            .reduce((acc, w) => acc + w.length, 0) + wordIndex;
          
          return (
            <span key={wordIndex} className={styles.word}>
              {word.split('').map((letter, letterIndex) => {
                // Calculate the overall index of this letter in the entire text
                const overallLetterIndex = previousWordsLetterCount + letterIndex;
                
                // Calculate the threshold at which this letter should reveal
                // Divide by total letters to get a value between 0 and 1
                const letterThreshold = overallLetterIndex / totalLetters;
                
                // Determine if this letter should be revealed based on scroll progress
                const isRevealed = scrollProgress >= letterThreshold;
                
                return (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className={`${styles.letter} ${isRevealed ? styles.revealed : ''}`}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          );
        })}
      </h1>
    </div>
  );
};

export default ScrollRevealText;
