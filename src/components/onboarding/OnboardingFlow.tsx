'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cards } from '../wizardData';
import OnboardingCard from './OnboardingCard';

// Import step-specific components
import SignInStep from './steps/SignInStep';
import ProfileForm from './steps/ProfileForm';
import CommunityDetailsStep from './steps/CommunityDetailsStep';
import AddMembersStep from './steps/AddMembersStep';
import DashboardStep from './steps/DashboardStep';

// Map component names to their implementations
const StepComponents: Record<string, React.ComponentType<any>> = {
  SignInStep,
  ProfileForm,
  CommunityDetailsStep,
  AddMembersStep,
  DashboardStep,
};

interface OnboardingFlowProps {
  initialStep?: number;
  onComplete?: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialStep = 0,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalSteps = cards.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 500); // Match this with CSS transition duration
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection('prev');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 500); // Match this with CSS transition duration
    }
  };

  // Get the current step data
  const currentStepData = cards[currentStep];
  
  // Dynamically get the component for the current step
  const StepComponent = currentStepData?.component ? 
    StepComponents[currentStepData.component] : 
    null;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
    >
      <div 
        className={`
          transition-transform duration-500 ease-in-out 
          ${isAnimating ? (direction === 'next' ? '-translate-x-full' : 'translate-x-full') : 'translate-x-0'}
        `}
      >
        <OnboardingCard
          step={currentStepData}
          currentStep={currentStep + 1}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrev={handlePrev}
        >
          {StepComponent && <StepComponent />}
        </OnboardingCard>
      </div>
    </div>
  );
};

export default OnboardingFlow;
