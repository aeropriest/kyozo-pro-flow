'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './OnboardingWizard.module.scss';
import { IoClose } from 'react-icons/io5';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { onboardingSteps } from './onboardingSteps';

// Import step components
import SignupStep from './steps/SignupStep';
import AvatarStep from './steps/AvatarStep';
import CommunityDetailsStep from './steps/CommunityDetailsStep';
import CommunitySettingsStep from './steps/CommunitySettingsStep';
import AddMembersStep from './steps/AddMembersStep';
import MemberManagementStep from './steps/MemberManagementStep';
import DashboardStep from './steps/DashboardStep';

// Component mapping for dynamic rendering
const stepComponents: { [key: string]: React.FC<any> } = {
  SignupStep,
  AvatarStep,
  CommunityDetailsStep,
  CommunitySettingsStep,
  AddMembersStep,
  MemberManagementStep,
  DashboardStep
};

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle closing with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle dialog animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setDirection('forward');
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 500); // Match this with CSS transition duration
    }
  };

  const handleBack = () => {
    if (currentStep > 0 && !isAnimating) {
      setIsAnimating(true);
      setDirection('backward');
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 500); // Match this with CSS transition duration
    }
  };

  if (!isOpen) return null;

  const step = onboardingSteps[currentStep];
  const StepComponent = stepComponents[step.component];

  return (
    <div className={styles.wizardOverlay}>
      <div 
        ref={dialogRef}
        className={styles.wizardContainer}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={24} />
        </button>

        <div className={styles.wizardContent}>
          <div className={styles.leftPanel}>
            <div className={styles.stepInfo}>
              <h2 className={styles.stepTitle}>{step.title}</h2>
              <p className={styles.stepSubtitle}>{step.subtitle}</p>
            </div>
            
            <div className={styles.navigationControls}>
              <button 
                className={`${styles.navButton} ${currentStep === 0 ? styles.disabled : ''}`}
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <MdArrowBack size={20} />
                <span>Back</span>
              </button>
              
              <button 
                className={styles.navButton}
                onClick={handleNext}
              >
                <span>{currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}</span>
                <MdArrowForward size={20} />
              </button>
            </div>
            
            <div className={styles.progressIndicator}>
              {onboardingSteps.map((_, index) => (
                <div 
                  key={index}
                  className={`${styles.progressDot} ${index === currentStep ? styles.active : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className={styles.rightPanel}>
            <div 
              className={`${styles.cardContainer} ${styles[direction]} ${isAnimating ? styles.animating : ''}`}
              style={{ backgroundImage: `url(${step.image})` }}
            >
              {StepComponent && (
                <StepComponent 
                  onNext={handleNext}
                  onPrev={handleBack}
                  currentStep={currentStep + 1}
                  totalSteps={onboardingSteps.length}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
