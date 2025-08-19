'use client';

import React, { useState, useEffect } from 'react';
import { WizardStep } from './wizardData';
import { Button } from './ui';
import styles from './AnimatedDialogCard.module.scss';

interface AnimatedDialogCardProps {
  step: WizardStep;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

const AnimatedDialogCard: React.FC<AnimatedDialogCardProps> = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onClose,
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | 'none'>('none');
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle enter/exit animations
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    
    setDirection('next');
    setIsAnimating(true);
    
    // Allow animation to complete before calling onNext
    setTimeout(() => {
      onNext();
      setDirection('none');
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    setDirection('prev');
    setIsAnimating(true);
    
    // Allow animation to complete before calling onPrev
    setTimeout(() => {
      onPrev();
      setDirection('none');
      setIsAnimating(false);
    }, 300);
  };

  // Determine animation classes based on direction
  const getAnimationClass = () => {
    if (direction === 'next') return styles.slideOutLeft;
    if (direction === 'prev') return styles.slideOutRight;
    return '';
  };

  // Determine if we're showing a video
  const isVideo = step.image?.endsWith('.mp4') || step.image?.endsWith('.webm');

  return (
    <div className={`${styles.card} ${isVisible ? styles.visible : ''} ${getAnimationClass()}`}>
      
      {/* Close button */}
      <button className={styles.closeButton} onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          {/* Header Section: 3 text values */}
          <div className={styles.headerSection}>
            <div className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</div>
            <h2 className={styles.title}>{step.title}</h2>
            <p className={styles.description}>{step.description}</p>
          </div>
          
          {/* Middle Section: Scrollable content */}
          <div className={styles.middleSection}>
            {children || (
              <div className={styles.defaultContent}>
                {step.customComponent || (
                  <p>Loading {step.component} component...</p>
                )}
              </div>
            )}
          </div>
          
          {/* Bottom Section: Fixed action buttons - only for non-auth steps */}
          {currentStep !== 1 && (
            <div className={styles.bottomSection}>
              {currentStep > 1 && (
                <Button 
                  variant="outline-only"
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className={styles.navButton}
                >
                  Back
                </Button>
              )}
              
              <Button 
                variant="outline-only"
                onClick={currentStep === totalSteps ? onClose : handleNext}
                disabled={isAnimating}
                className={styles.navButton}
              >
                {currentStep === totalSteps ? 'Finish' : 'Next'}
              </Button>
            </div>
          )}
        </div>
        
        {/* Right panel with image/video */}
        <div className={styles.rightPanel}>
          {isVideo ? (
            <video 
              src={step.image} 
              autoPlay 
              loop 
              muted 
              className={styles.media}
            />
          ) : (
            <img 
              src={step.image} 
              alt={step.title} 
              className={styles.media}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedDialogCard;
