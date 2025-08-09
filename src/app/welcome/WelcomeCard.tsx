'use client';
import React from 'react';
import styles from '@/app/welcome/Welcome.module.scss';
import Image from 'next/image';
import Button from '@/components/Button';

interface WelcomeCardProps {
  className?: string;
  step?: {
    title: string;
    subtitle: string;
    image: string;
    component: string;
  };
  currentStep?: number;
  totalSteps?: number;
  onNext?: () => void;
  onBack?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ 
  className = '', 
  step = {
    title: "Grow your creative community",
    subtitle: "Are you a creative professional, community organizer, or small business owner working within the creative industries?",
    image: "/card-3.png",
    component: 'WelcomeStep'
  },
  currentStep = 0,
  totalSteps = 1,
  onNext,
  onBack
}) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.leftContent}>
          <p className={styles.categoryLabel}>STEP {currentStep + 1} OF {totalSteps}</p>
          <h2 className={styles.cardTitle}>{step.title}</h2>
          <p className={styles.cardDescription}>
            {step.subtitle}
            {step.component === 'WelcomeStep' && (
              <>
                We understand the challenges of nurturing and growing a dedicated audience, so we built KyozoPro, a comprehensive platform that enhances genuine connections and unlocks new opportunities.
              </>
            )}
          </p>
          <div className={styles.navigationButtons}>
            {currentStep > 0 && (
              <Button 
                variant="outline-only" 
                onClick={onBack}
                className={styles.navButton}
              >
                Back
              </Button>
            )}
            <Button 
              // variant={currentStep === totalSteps - 1 ? "primary" : "outline-only"}
              variant="outline-only" 
              onClick={onNext}
              className={styles.navButton}
            >
              {currentStep === totalSteps - 1 ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>
        <div className={styles.rightContent}>
          <Image 
            src={step.image} 
            alt={step.title} 
            width={800} 
            height={800} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>      
    </div>
  );
};

export default WelcomeCard;
