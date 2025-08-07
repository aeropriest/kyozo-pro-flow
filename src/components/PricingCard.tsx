import React from 'react';
import { PricingCardData } from '../types';
import styles from './PricingCard.module.scss';
import { FaCircleCheck } from "react-icons/fa6";

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
              <FaCircleCheck size={24}/>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
