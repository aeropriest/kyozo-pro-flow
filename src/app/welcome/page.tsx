'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import WelcomeCard from './WelcomeCard';

export default function Home() {

  const STEPS = [
    {
      title: "Welcome to Kyozo",
      subtitle: "Your journey to a vibrant community starts here.",
      image: "/Parallax1.jpg",
      component: 'WelcomeStep',
    },
    {
      title: "Create Your Account",
      subtitle: "Sign up with your email or connect with Google.",
      image: "/Parallax2.jpg",
      component: 'SignupStep',
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
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  // Initialize step from URL parameter if present
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseInt(stepParam, 10) - 1; // Convert to 0-based index
      if (!isNaN(step) && step >= 0 && step < STEPS.length) {
        setCurrentStep(step);
      }
    }
  }, [searchParams]);

  // Update URL when step changes
  useEffect(() => {
    const url = new URL(window.location.href);
    const newStep = currentStep + 1; // Convert to 1-based for URL
    
    // Only update URL if it's different to prevent unnecessary history entries
    if (url.searchParams.get('step') !== newStep.toString()) {
      url.searchParams.set('step', newStep.toString());
      window.history.pushState({}, '', url);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle completion - e.g., redirect to dashboard
      console.log('Onboarding complete!');
      // You could add a redirect here
      // window.location.href = '/dashboard';
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main>
      <WelcomeCard 
        step={STEPS[currentStep]}
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onNext={handleNext}
        onBack={handleBack}
      />
    </main>
  );
}