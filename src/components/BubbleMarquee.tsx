'use client';

import React, { useMemo } from 'react';
import styles from './BubbleMarquee.module.scss';

// Define the bubble row colors based on the image
const bubbleRowColors = {
  music: '#3b82f6',        // Blue accent for music
  artMovements: '#8b5cf6', // Purple accent for art movements
  crafts: '#f97316',       // Orange accent for crafts
  fashion: '#ec4899',      // Pink accent for fashion
  performance: '#14b8a6',  // Teal accent for performance
  techno: '#3b82f6',       // Blue accent for techno
  futurism: '#6192D1',     // Purple accent for futurism
  classicism: '#BB6DC9',   // Purple accent for classicism
  jewelry: '#FFD861',      // Orange accent for jewelry
  vintage: '#C7736C',      // Pink accent for vintage
  minimal: '#EEF840',      // Teal accent for minimal
};

interface BubbleItem {
  text: string;
  color?: string;
}

interface BubbleRowProps {
  items: BubbleItem[];
  direction: 'left' | 'right';
  speed?: number;
  category: keyof typeof bubbleRowColors;
}

const BubbleRow: React.FC<BubbleRowProps> = ({ 
  items, 
  direction, 
  speed = 5, 
  category 
}) => {
  const rowColor = bubbleRowColors[category];
  
  // Create enough duplicates to fill the screen width
  const repeatedItems = useMemo(() => {
    // Create 8 sets of items to ensure the row is never empty
    // This ensures there's always content visible regardless of screen size
    const repeated = [];
    for (let i = 0; i < 8; i++) {
      repeated.push(...items);
    }
    return repeated;
  }, [items]);
  
  return (
    <div className={styles.bubbleRowContainer}>
      <div 
        className={`${styles.bubbleRow} ${direction === 'right' ? styles.toRight : styles.toLeft}`}
        style={{ 
          '--scroll-duration': `${speed}s`,
        } as React.CSSProperties}
      >
        {/* First set of repeated items */}
        {repeatedItems.map((item, index) => (
          <div 
            key={`item-${index}`} 
            className={styles.bubble}
            style={{ 
              borderColor: rowColor,
              '--hover-bg': rowColor
              // Not setting color here to use theme text color from CSS
            } as React.CSSProperties}
          >
            {item.text}
          </div>
        ))}
        
        {/* Second set for seamless looping */}
        {repeatedItems.map((item, index) => (
          <div 
            key={`item-dup-${index}`} 
            className={styles.bubble}
            style={{ 
              borderColor: rowColor,
              '--hover-bg': rowColor
              // Not setting color here to use theme text color from CSS
            } as React.CSSProperties}
            aria-hidden="true"
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

interface BubbleMarqueeProps {
  categories: {
    category: keyof typeof bubbleRowColors;
    items: BubbleItem[];
  }[];
}

const BubbleMarquee: React.FC<BubbleMarqueeProps> = ({ categories }) => {
  return (
    <div className={styles.bubbleMarqueeContainer}>
      {categories.map((row, index) => (
        <BubbleRow 
          key={`row-${index}`}
          items={row.items}
          direction={index % 2 === 0 ? 'left' : 'right'}
          speed={80} // Slower animation for better readability
          category={row.category}
        />
      ))}
    </div>
  );
};

export default BubbleMarquee;
