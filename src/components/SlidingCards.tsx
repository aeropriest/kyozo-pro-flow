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
      
      // The total distance the container can be scrolled through
      const scrollableDistance = height - viewportHeight;
      
      // The amount of pixels scrolled past the top of the container
      const scrolled = -top;
      
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
      style={{ height: `${100 + scrollPerCard * cardsToScrollPast}vh` }}
      className={`${styles.slidingCardsContainer} ${className}`}
    >
      <div className={styles.stickyContainer}>
        {childrenArray.map((child, i) => {
          let transform = 'translateY(100%) scale(1)';
          const zIndex = i;

          if (i <= activeCardIndex) {
            // Cards that have been fully revealed stay in place
            transform = 'translateY(0) scale(1)';
          } else if (i === activeCardIndex + 1) {
            // The next card to be revealed animates in
            const animationProgress = Math.min(1, progressInSegment / transitionDurationRatio);
            const translateY = 100 - animationProgress * 100;
            transform = `translateY(${translateY}%) scale(1)`;
          }
          // Cards further down the stack remain off-screen (default transform)

          return (
            <div
              key={i}
              className={styles.cardWrapper}
              style={{
                zIndex,
                transform,
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
