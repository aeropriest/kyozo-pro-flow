'use client';

import { useState } from 'react';
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
  const [currentStep, setCurrentStep] = useState(0);

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