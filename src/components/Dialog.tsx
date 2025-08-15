'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Dialog.module.scss';
import { Button } from '@/components/ui';
import Image from 'next/image';
import DialogCard from './DialogCard';
import SignInForm from './SignInForm';

const cards = [
  {
    title: "Sign In / Sign Up",
    subtitle: "Welcome to Kyozo Pro",
    image: "/form-right.mp4",
    component: 'SignInStep',
    customComponent: null
  },
  {
    title: "Set Your Avatar",
    subtitle: "Give your profile a personal touch.",
    image: "/Parallax3.jpg",
    component: 'AvatarStep',
  },
  {
    title: "Create Your Community",
    subtitle: "Tell us about your community.",
    image: "/Parallax4.jpg",
    component: 'CommunityDetailsStep',
    customComponent: null,
  },
  {
    title: "Community Settings",
    subtitle: "Customize your community's rules and appearance.",
    image: "/Parallax5.jpg",
    component: 'CommunitySettingsStep',
    customComponent: null,
  },
  {
    title: "Add Community Members",
    subtitle: "Let's grow your community together.",
    image: "/Parallax1.jpg",
    component: 'AddMembersStep',
    customComponent: null,
  },
  {
    title: "Member Management",
    subtitle: "Review and manage your members.",
    image: "/Parallax2.jpg",
    component: 'MemberManagementStep',
    customComponent: null,
  },
  {
    title: "Onboarding Complete!",
    subtitle: "You're all set. Welcome to the dashboard!",
    image: "/Parallax3.jpg",
    component: 'DashboardStep',
    customComponent: null,
  },
];

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
  title = "Create Your Account",
  subtitle = "Sign up with your email or connect with Google.",
  children,
  className = '',
  showTabs = false,
  tabs = [],
  activeTab = 0,
  onTabChange = () => {},
  step = 1,
  totalSteps = 6,
}) => {
  // State for card navigation
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Form state management
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ fullName: '', email: '', password: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Handle form input changes
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submissions
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign In:', signInForm, 'Terms accepted:', termsAccepted);
    // Add actual sign in logic here
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up:', signUpForm, 'Terms accepted:', termsAccepted);
    // Add actual sign up logic here
  };

  // Handle tab changes
  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    onTabChange(index);
  };

  // Handle card navigation
  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1 && !isAnimating) {
      setSlideDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev + 1);
        setIsAnimating(false);
      }, 800);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0 && !isAnimating) {
      setSlideDirection('prev');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev - 1);
        setIsAnimating(false);
      }, 800);
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

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

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
        <div className={styles.dialogContent}>
          <div className={`${styles.cardsContainer} ${isAnimating ? styles.animating : ''} ${slideDirection === 'next' ? styles.slideNext : styles.slidePrev}`}>
            {cards.map((page, index) => {
              // Calculate scale based on card position and animation direction
              let scale = 1;
              let zIndex = cards.length - Math.abs(index - currentCardIndex);

              if (slideDirection === 'next' && index === currentCardIndex - 1) {
                scale = isAnimating ? 0.85 : 1;
              } else if (slideDirection === 'prev' && index === currentCardIndex + 1) {
                scale = isAnimating ? 0.85 : 1;
              }

              return (
                <div
                  key={index}
                  className={`${styles.cardWrapper} ${index === currentCardIndex ? styles.active : ''}`}
                  style={{
                    transform: `translateX(${(index - currentCardIndex) * 100}%) scale(${scale})`,
                    zIndex: zIndex,
                  }}
                >
                  <DialogCard
                    key={index}
                    title={page.title || ''}
                    subtitle={page.subtitle || ''}
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
                      index === 0 ? (
                        <SignInForm 
                          onNext={handleNextCard} 
                          currentStep={index + 1} 
                          totalSteps={cards.length}
                        />
                      ) : page.customComponent
                    }
                    content={
                      index === 0 ? (
                        <VideoPlayer />
                      ) : (
                        <Image src={page.image} alt={page.title} width={800} height={800} />
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
