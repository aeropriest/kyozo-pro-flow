"use client";

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './SlidingCards.module.scss';

interface SlidingCardsProps {
  children: ReactNode;
  className?: string;
}

const SlidingCards: React.FC<SlidingCardsProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const numCards = childrenArray.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { top, height } = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Start animation when the container is 20% into the viewport
      const startOffset = viewportHeight * 0.2;
      
      // The total distance the container can be scrolled through
      const scrollableDistance = height - viewportHeight + startOffset;
      
      // The amount of pixels scrolled past the top of the container
      const scrolled = -top + startOffset;
      
      if (scrollableDistance > 0) {
        // Calculate progress as a value between 0 and 1
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set the state correctly on load
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [numCards]);

  const cardsToScrollPast = numCards - 1;
  const cardProgress = scrollProgress * cardsToScrollPast;
  const activeCardIndex = Math.floor(cardProgress);
  const progressInSegment = cardProgress - activeCardIndex;

  // Each card's animation happens over a portion of the scroll.
  // We define the scroll height per card in vh units.
  const scrollPerCard = 100; // vh
  // The animation (translateY) occurs over the first 80% of that scroll distance.
  const transitionDurationRatio = 0.8;

  return (
    <div
      ref={containerRef}
      style={{ 
        height: `${100 + scrollPerCard * cardsToScrollPast}vh`,
        overflowX: 'visible' // Ensure sliding cards can overflow horizontally if needed
      }}
      className={`${styles.slidingCardsContainer} ${className}`}
    >
      <div className={styles.stickyContainer}>
        {childrenArray.map((child, i) => {
          let transform = 'translateY(100%) scale(1)';
          let zIndex = i; // Cards that come later should be on top when sliding over
          let scale = 1;
          let translateY = 100;

          if (i <= activeCardIndex) {
            // Cards that have been fully revealed
            translateY = 0;
            scale = 1;
            
            // Check if this card should be shrunk
            if (i < activeCardIndex) {
              // Cards that have been passed by subsequent cards stay shrunk
              scale = 0.85; // Keep them at 15% smaller
            } else if (i === activeCardIndex && activeCardIndex + 1 < numCards) {
              // Current card starts shrinking when next card covers 70%
              const nextCardProgress = Math.min(1, progressInSegment / transitionDurationRatio);
              if (nextCardProgress >= 0.7) {
                // Start shrinking after 70% coverage
                const shrinkProgress = (nextCardProgress - 0.7) / 0.3; // 0 to 1 over remaining 30%
                scale = 1 - (shrinkProgress * 0.15); // Shrink by up to 15%
              }
            }
            
            transform = `translateY(${translateY}%) scale(${scale})`;
          } else if (i === activeCardIndex + 1) {
            // The next card slides over the current one
            const animationProgress = Math.min(1, progressInSegment / transitionDurationRatio);
            translateY = 100 - animationProgress * 100;
            scale = 1;
            transform = `translateY(${translateY}%) scale(${scale})`;
          }
          // Cards further down the stack remain off-screen (default transform)

          return (
            <div
              key={i}
              className={styles.cardWrapper}
              style={{
                zIndex,
                transform,
                transformOrigin: 'center center',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlidingCards;
