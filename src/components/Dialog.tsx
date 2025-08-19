'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Dialog.module.scss';
import AnimatedDialogCard from './AnimatedDialogCard';

// Import step components
import SignInStep from './onboarding/steps/SignInStep';
import ProfileForm from './onboarding/steps/ProfileForm';
import CommunityDetailsStep from './onboarding/steps/CommunityDetailsStep';
import AddMembersStep from './onboarding/steps/AddMembersStep';
import DashboardStep from './onboarding/steps/DashboardStep';
import { cards } from './wizardData';


interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep < cards.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  // Map step indices to their corresponding components
  const stepComponents = [
    <SignInStep key="signin" onNext={handleNext} />,
    <ProfileForm key="profile" />,
    <CommunityDetailsStep key="community" />,
    <AddMembersStep key="members" />,
    <DashboardStep key="dashboard" />
  ];

  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Prevent body scrolling when dialog is open
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

  // Reset to first step when dialog is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className={styles.overlay}>
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${className} ${isClosing ? styles.closing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.dialogContent}>
          <AnimatedDialogCard
            step={cards[currentStep]}
            currentStep={currentStep + 1}
            totalSteps={cards.length}
            onNext={handleNext}
            onPrev={handlePrev}
            onClose={handleClose}
          >
            {stepComponents[currentStep]}
          </AnimatedDialogCard>
        </div>
      </div>
    </div>
  );
};

// VideoPlayer component to handle video playback
const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to play the video when component mounts
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
          console.log('Video playing successfully');
        }
      } catch (error) {
        console.error('Error playing video:', error);
      }
    };

    playVideo();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <video 
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <source src="/form-right.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Dialog;
