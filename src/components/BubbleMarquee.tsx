'use client';

import React from 'react';
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
  speed = 30, 
  category 
}) => {
  const rowColor = bubbleRowColors[category];
  
  return (
    <div className={styles.bubbleRowContainer}>
      <div 
        className={`${styles.bubbleRow} ${direction === 'right' ? styles.toRight : styles.toLeft}`}
        style={{ 
          '--scroll-duration': `${speed}s`,
          '--row-color': rowColor
        } as React.CSSProperties}
      >
        {/* Original items */}
        {items.map((item, index) => (
          <div 
            key={`item-${index}`} 
            className={styles.bubble}
            style={item.color ? { backgroundColor: item.color } : undefined}
          >
            {item.text}
          </div>
        ))}
        
        {/* Duplicate items for seamless looping */}
        {items.map((item, index) => (
          <div 
            key={`item-dup-${index}`} 
            className={styles.bubble}
            style={item.color ? { backgroundColor: item.color } : undefined}
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
          speed={30 + (index * 5)} // Slightly different speeds for each row
          category={row.category}
        />
      ))}
    </div>
  );
};

export default BubbleMarquee;
