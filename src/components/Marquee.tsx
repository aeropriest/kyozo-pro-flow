'use client';

import React, { useMemo } from 'react';
import styles from './Marquee.module.scss';
import { colors } from '../lib/colors.generated';
import { FaCircleCheck } from "react-icons/fa6";

// Marquee row colors using centralized accent colors from color system
const marqueeRowColors = {
  music: colors.accentBlue,        // Blue accent for music
  artMovements: colors.accentPurple, // Purple accent for art movements
  crafts: colors.accentOrange,     // Orange accent for crafts
  fashion: colors.borderAccent,    // Pink accent for fashion (using borderAccent which is pink)
  performance: colors.accentTeal,  // Teal accent for performance
};

interface Item {
  text: string;
  color?: string;
}

interface RowProps {
  items: Item[];
  direction: 'left' | 'right';
  speed?: number;
  category: keyof typeof marqueeRowColors;
}

const Row: React.FC<RowProps> = ({ 
  items, 
  direction, 
  speed = 10, 
  category 
}) => {
  const rowColor = marqueeRowColors[category];
  
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
    <div className={styles.rowContainer}>
      <div 
        className={`${styles.row} ${direction === 'right' ? styles.toRight : styles.toLeft}`}
        style={{ 
          '--scroll-duration': `${speed}s`,
          '--row-color': rowColor
        } as React.CSSProperties}
      >
        {/* First set of repeated items */}
        {repeatedItems.map((item, index) => (
          <div 
            key={`item-${index}`} 
            className={styles.item}
          >
            <FaCircleCheck size={24}/> <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface MarqueeProps {
  categories: {
    category: keyof typeof marqueeRowColors;
    items: Item[];
  }[];
}

const Marquee: React.FC<MarqueeProps> = ({ categories }) => {
  return (
    <div className={styles.marqueeContainer}>
      {categories.map((row, index) => (
        <Row 
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

export default Marquee;
