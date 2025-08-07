'use client';

import React, { useMemo } from 'react';
import styles from './BubbleMarquee.module.scss';
import { bubbleRowColors } from '@/lib/colors';

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
  speed = 10, 
  category 
}) => {
  const rowColor = bubbleRowColors[category];
  
  // Create enough duplicates to fill the screen width
  const repeatedItems = useMemo(() => {
    // Create 4 sets of items to ensure the row is never empty
    const repeated = [];
    for (let i = 0; i < 4; i++) {
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
          '--row-color': rowColor
        } as React.CSSProperties}
      >
        {/* First set of repeated items */}
        {repeatedItems.map((item, index) => (
          <div 
            key={`item-${index}`} 
            className={styles.bubble}
            style={{ borderColor: rowColor }}
          >
            {item.text}
          </div>
        ))}
        
        {/* Second set for seamless looping */}
        {repeatedItems.map((item, index) => (
          <div 
            key={`item-dup-${index}`} 
            className={styles.bubble}
            style={{ borderColor: rowColor }}
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
          // speed={60 + (index * 5)} // Reduced speed (higher number = slower animation)
          speed={80}
          category={row.category}
        />
      ))}
    </div>
  );
};

export default BubbleMarquee;
