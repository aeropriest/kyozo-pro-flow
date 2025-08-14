'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './SlideCardStyle.module.scss';

interface SlidingCardProps {
  title: string;
  subtitle: string;
  text: string;
  button: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const SlidingCard: React.FC<SlidingCardProps> = ({ 
  title, 
  subtitle, 
  text, 
  button, 
  content, 
  className = '' 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1 range
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1 range
        setMousePosition({ x, y });
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  // Clone the content and pass mouse position if it's ParallaxGallery
  const enhancedContent = React.isValidElement(content) && 
    content.type && 
    (content.type as any).name === 'ParallaxGallery'
    ? React.cloneElement(content as React.ReactElement<any>, {
        externalMousePosition: mousePosition
      })
    : content;

  return (
    <div ref={cardRef} className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <p className={styles.categoryLabel}>{subtitle}</p>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardDescription}>
            {text}
          </p>
          <div>
            {button}
          </div>
        </div>
        <div className={styles.rightContent}>
          {enhancedContent}
        </div>
      </div>
    </div>
  );
};

export default SlidingCard;
