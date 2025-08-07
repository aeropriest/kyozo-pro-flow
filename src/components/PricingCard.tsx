import React from 'react';
import { PricingCardData } from '../types';
import CheckMarkIcon from './CheckMarkIcon';
import styles from './PricingCard.module.scss';

// Color mapping for subtitle colors
const colorMap: Record<string, string> = {
  'blue-400': '#60a5fa',
  'purple-400': '#c084fc',
  'amber-400': '#fbbf24',
};

const PricingCard: React.FC<PricingCardData> = ({
  title,
  subtitle,
  price,
  priceDescription,
  features,
  gradient,
  subtitleColor,
}) => {
  const [fromClass, toClass] = gradient.split(' ');
  const viaClass = toClass.replace('to-', 'via-');

  // Creates a smoother gradient that transitions from the accent colors
  // in the corner to the neutral gray over a larger area.
  const gradientClasses = `bg-gradient-to-br ${fromClass} ${viaClass} via-25% to-neutral-600 to-60%`;

  // Extract colors from gradient for CSS variables
  const [fromColor, toColor] = gradient.split(' ');
  const viaColor = toColor.replace('to-', 'via-');
  
  // Convert Tailwind color classes to CSS variables
  const colorMap: Record<string, string> = {
    'from-blue-500': '#3b82f6',
    'to-cyan-500': '#06b6d4',
    'from-purple-500': '#a855f7',
    'to-pink-500': '#ec4899',
    'from-amber-500': '#f59e0b',
    'to-orange-500': '#f97316',
    'via-blue-500': '#3b82f6',
    'via-purple-500': '#a855f7',
    'via-amber-500': '#f59e0b',
  };

  const style = {
    '--from-color': colorMap[fromColor] || '#3b82f6',
    '--via-color': colorMap[viaColor] || colorMap[toColor] || '#06b6d4',
  } as React.CSSProperties;

  return (
    <div className={styles.card} style={style}>
      <div className={styles.cardInner}>
        <header>
          <h2>{title}</h2>
          <hr />
          <p 
            className={styles.subtitle} 
            style={{ color: colorMap[subtitleColor] || colorMap['blue-400'] }}
          >
            {subtitle}
          </p>
          <p className={styles.price}>
            {price} <span>{priceDescription}</span>
          </p>
        </header>

        <ul className={styles.featuresList}>
          {(features as string[]).map((feature, index) => (
            <li key={index}>
              <CheckMarkIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
