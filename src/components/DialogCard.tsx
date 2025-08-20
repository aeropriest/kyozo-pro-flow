'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './DialogCard.module.scss';

interface SlidingCardProps {
  title: string;
  subtitle: string;
  text: string;
  description?: string;
  button: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  customComponent?: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  content?: React.ReactNode;
}

const DialogCard: React.FC<SlidingCardProps> = ({ 
  title, 
  subtitle, 
  text, 
  description = '', // Added description with default empty string
  button, 
  content, 
  className = '',
  customComponent,
  currentStep = 1,
  totalSteps = 6
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
    (content.type as React.ComponentType).name === 'ParallaxGallery'
    ? React.cloneElement(content as React.ReactElement<{externalMousePosition?: {x: number, y: number}}>, {
        externalMousePosition: mousePosition
      })
    : content;

  return (
    <div ref={cardRef} className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          {!customComponent && (
            <div className={styles.stepIndicator}>
              Step {currentStep} of {totalSteps}
            </div>
          )}
          {customComponent ? (
            customComponent
          ) : (
            <>
              <p className={styles.categoryLabel}>{subtitle}</p>
              <h2 className={styles.cardTitle}>{title}</h2>
              {description && (
                <p className={styles.cardDescription}>
                  {description}
                </p>
              )}
              <p className={styles.cardText}>
                {text}
              </p>
              <div className={styles.buttonContainer}>
                {button}
              </div>
            </>
          )}
        </div>
        <div className={styles.rightContent}>
          {enhancedContent}
        </div>
      </div>
    </div>
  );
};

export default DialogCard;
