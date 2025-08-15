'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Dialog.module.scss';
import { Button } from '@/components/ui';
import Image from 'next/image';
import DialogCard from './DialogCard';

const cards = [
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
  },
  {
    title: "Community Settings",
    subtitle: "Customize your community's rules and appearance.",
    image: "/Parallax5.jpg",
    component: 'CommunitySettingsStep',
  },
  {
    title: "Add Community Members",
    subtitle: "Let's grow your community together.",
    image: "/Parallax1.jpg",
    component: 'AddMembersStep',
  },
  {
    title: "Member Management",
    subtitle: "Review and manage your members.",
    image: "/Parallax2.jpg",
    component: 'MemberManagementStep',
  },
  {
    title: "Onboarding Complete!",
    subtitle: "You're all set. Welcome to the dashboard!",
    image: "/Parallax3.jpg",
    component: 'DashboardStep',
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
  totalSteps = 6
}) => {
  // Form state management
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });
  
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 600); // Match animation duration (0.6s)
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
  }, [isOpen, onClose]);

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
  }, [isOpen, onClose]);

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

  return(    
    <div className={styles.overlay}>
    <div 
      ref={dialogRef}
      className={`${styles.dialog} ${className} ${isClosing ? styles.closing : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.dialogContent}>
           
        {cards.map((page, index) => (
          <DialogCard
            key={index}
            subtitle={page.subtitle}
            title={page.title}
            text={`Step ${index + 1} of ${cards.length}: ${page.component}`}
            button={<Button variant="outline-only" size="medium" href="#">Continue</Button>}
            content={<Image src={page.image} alt={page.title} width={800} height={800} />}
          />
        ))}
      
      </div>
    </div>
    </div>
)
};

export default Dialog;