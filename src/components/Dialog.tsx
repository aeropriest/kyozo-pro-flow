'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Dialog.module.scss';
import authStyles from '@/app/forms/AuthForm.module.scss';
import { Button } from '@/components/ui';
import Image from 'next/image';
import DialogCard from './DialogCard';
import { validateSignIn, validateSignUp } from '@/app/forms/auth.validation';
import AuthForm from '@/app/forms/AuthForm';
import GenericForm from '@/app/forms/GenericForm';
// import ProfileForm from './ProfileForm';
// Import form components individually
// import AvatarStep from './forms/AvatarStep';
// import CommunityDetailsStep from './forms/CommunityDetailsStep';
// import CommunitySettingsStep from './forms/CommunitySettingsStep';
// import AddMembersStep from './forms/AddMembersStep';
// import DashboardStep from './forms/DashboardStep';
import { cards } from './wizardData';

interface Tab {
  label: string;
  count?: number;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  showTabs?: boolean;
  tabs?: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  step?: number;
  totalSteps?: number;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  showTabs = false,
  tabs = [],
  activeTab = 0,
  onTabChange = () => {},
  step = 1,
  totalSteps = 6,
}) => {
  // State for card navigation - simplified without animations
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Form state management
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [formValues, setFormValues] = useState({ fullName: '', email: '', password: '', terms: false });
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Handle form submissions
  const handleAuthSubmit = (data: any) => {
    if (authMode === 'signin') {
      console.log('Sign In:', data);
      // Add actual sign in logic here
      // Move to next card after successful authentication
      handleNextCard();
    } else {
      console.log('Sign Up:', data);
      // Add actual sign up logic here
      // Move to next card after successful authentication
      handleNextCard();
    }
  };

  const handleGoogleAuth = () => {
    console.log(`Google ${authMode === 'signin' ? 'Sign In' : 'Sign Up'}`);
    // Add actual Google auth logic here
    // Move to next card after successful authentication
    handleNextCard();
  };
  
  // Reference to the AuthForm component
  const authFormRef = useRef<any>(null);

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin');
  };

  // Handle tab changes
  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    onTabChange(index);
  };

  // Handle card navigation - simplified without animations
  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const dialogRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 600);
  };

  // Modal dialog - no longer closes when clicking outside
  // We've removed the click outside handler to make it truly modal

  // Modal dialog - no longer closes on escape key
  // We've removed the escape key handler to make it truly modal

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

  if (!isOpen && !isClosing) return null;

  return (
    <div className={styles.overlay}>
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${className} ${isClosing ? styles.closing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.dialogContent}>
          <div className={styles.cardsContainer}>
            {cards.map((page, index) => {
              // Simple display logic without animations
              const isActive = index === currentCardIndex;
              const zIndex = cards.length - Math.abs(index - currentCardIndex);
              
              // Only show the active card
              if (!isActive) return null;
              
              // Position the card
              const translateX = '0%';
              
              return (
                <div
                  key={index}
                  className={`${styles.cardWrapper} ${styles.active}`}
                  style={{
                    transform: `translateX(${translateX})`,
                    zIndex: zIndex,
                  }}
                >
                  <DialogCard
                    key={index}
                    title={page.title || ''}
                    subtitle={page.description || ''}
                    description={page.description || ''}
                    text=""
                    currentStep={index + 1}
                    totalSteps={cards.length}
                    button={
                      <>
                        {index > 0 && (
                          <Button
                            variant="outline"
                            size="small"
                            onClick={() => handlePrevCard()}
                            className={styles.backButton}
                          >
                            Back
                          </Button>
                        )}
                        <Button
                          variant="primary"
                          size="small"
                          onClick={() => index === cards.length - 1 ? onClose() : handleNextCard()}
                        >
                          {index === cards.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </>
                    }
                    customComponent={
                      (() => {
                        switch(index) {
                          case 0:
                            return (
                              <>
                                <div className={styles.stepIndicator}>
                                  <span>Step {index + 1}/{cards.length}</span>
                                </div>
                                <GenericForm
                                title={authMode === 'signin' ? 'Welcome Back' : 'Get Started'}
                                description={authMode === 'signin' ? 'Sign in to continue your journey.' : 'Sign up to get started with our platform.'}
                                actionButtons={
                                  <div className={styles.buttonRow}>
                                    <Button 
                                      type="submit" 
                                      fullWidth 
                                      variant="primary"
                                      onClick={() => {
                                        if (authFormRef.current) {
                                          authFormRef.current.submitForm();
                                        }
                                      }}
                                    >
                                      {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                                    </Button>
                                    <Button 
                                      type="button" 
                                      fullWidth 
                                      variant="outline-only"
                                      onClick={handleGoogleAuth}
                                    >
                                      {authMode === 'signin' ? 'Sign In with Google' : 'Sign Up with Google'}
                                    </Button>
                                  </div>
                                }
                              >
                                <div className={styles.compactFormFields}>
                                  <AuthForm 
                                    ref={authFormRef}
                                    fields={authMode === 'signin' ? [
                                      { name: 'email', type: 'email', placeholder: 'Your Email' },
                                      { name: 'password', type: 'password', placeholder: 'Password' },
                                    ] : [
                                      { name: 'fullName', type: 'text', placeholder: 'Your Name' },
                                      { name: 'email', type: 'email', placeholder: 'Your Email' },
                                      { name: 'password', type: 'password', placeholder: 'Create a password' },
                                      { name: 'terms', type: 'checkbox', placeholder: '', label: <>I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a></> },
                                    ]}
                                    initialValues={authMode === 'signin' ? 
                                      { email: '', password: '' } : 
                                      { fullName: '', email: '', password: '', terms: false }
                                    }
                                    validate={authMode === 'signin' ? validateSignIn : validateSignUp}
                                    onSubmit={handleAuthSubmit}
                                    submitText="" // Empty as we're using GenericForm buttons
                                    googleText="" // Empty as we're using GenericForm buttons
                                    extraContent={authMode === 'signin' ? (
                                      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                                        <a href="#">Forgot password?</a>
                                      </div>
                                    ) : undefined}
                                  />
                                </div>
                                <div className={styles.authToggle}>
                                  {authMode === 'signin' ? (
                                    <p>Don't have an account? <button type="button" onClick={toggleAuthMode}>Sign Up</button></p>
                                  ) : (
                                    <p>Already have an account? <button type="button" onClick={toggleAuthMode}>Sign In</button></p>
                                  )}
                                </div>
                              </GenericForm>
                              </>
                            );
                          // case 1:
                          //   return (
                          //     <ProfileForm 
                          //       onNext={handleNextCard}
                          //       onPrev={handlePrevCard}
                          //       currentStep={index + 1}
                          //       totalSteps={cards.length}
                          //     />
                          //   );
                          // case 2:
                          //   return (
                          //     <CommunityDetailsStep 
                          //       onNext={handleNextCard}
                          //       onPrev={handlePrevCard}
                          //       currentStep={index + 1}
                          //       totalSteps={cards.length}
                          //     />
                          //   );
                          // case 3:
                          //   return (
                          //     <CommunitySettingsStep 
                          //       onNext={handleNextCard}
                          //       onPrev={handlePrevCard}
                          //       currentStep={index + 1}
                          //       totalSteps={cards.length}
                          //     />
                          //   );
                          // case 4:
                          //   return (
                          //     <AddMembersStep 
                          //       onNext={handleNextCard}
                          //       onPrev={handlePrevCard}
                          //       currentStep={index + 1}
                          //       totalSteps={cards.length}
                          //     />
                          //   );
                          // case 5:
                          //   return (
                          //     <DashboardStep 
                          //       onNext={onClose}
                          //       onPrev={handlePrevCard}
                          //       currentStep={index + 1}
                          //       totalSteps={cards.length}
                          //     />
                          //   );
                          default:
                            return page.customComponent;
                        }
                      })()
                    }
                    content={
                      index === 0 ? (
                        <VideoPlayer />
                      ) : (
                        <Image src={page.image} alt={page.subtitle} width={800} height={800} />
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
          {/* Add children if you want other content inside dialog */}
          {children}
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
