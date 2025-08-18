import React, { useState, useMemo } from 'react';
import type { OnboardingData, WizardStep } from './types';
import {
  SignInStep,
  AvatarStep,
  CommunityDetailsStep,
  CommunitySettingsStep,
  AddMembersStep,
  MemberManagementStep,
  DashboardStep
} from './components/WizardSteps';

const WIZARD_STEPS_CONFIG: Omit<WizardStep, 'component'>[] = [
  {
    title: "Sign In / Sign Up",
    subtitle: "Welcome to Kyozo Pro",
    description: "Create an account or sign in to access your community dashboard and settings.",
    image: "https://picsum.photos/seed/signin/800/1200",
  },
  {
    title: "Avatar Setup",
    subtitle: "Choose your profile picture.",
    description: "Select or upload an image that represents you. This will be visible to other members of your community.",
    image: "https://picsum.photos/seed/avatar/800/1200",
  },
  {
    title: "Create Your Community",
    subtitle: "Tell us about your community.",
    description: "Provide details about your community's purpose, goals, and target audience to help us customize your experience.",
    image: "https://picsum.photos/seed/community/800/1200",
  },
  {
    title: "Community Settings",
    subtitle: "Customize your community's rules and appearance.",
    description: "Set up guidelines, privacy options, and visual elements to create a unique identity for your community.",
    image: "https://picsum.photos/seed/settings/800/1200",
  },
  {
    title: "Add Community Members",
    subtitle: "Let's grow your community together.",
    description: "Invite friends, colleagues, or interested individuals to join your community and participate in discussions.",
    image: "https://picsum.photos/seed/members/800/1200",
  },
  {
    title: "Member Management",
    subtitle: "Review and manage your members.",
    description: "Assign roles, set permissions, and organize your community members to create an effective structure.",
    image: "https://picsum.photos/seed/manage/800/1200",
  },
  {
    title: "Onboarding Complete!",
    subtitle: "You're all set. Welcome to the dashboard!",
    description: "Congratulations on setting up your community! You now have access to all the tools and features to manage your community effectively.",
    image: "https://picsum.photos/seed/complete/800/1200",
  },
];

const stepComponents = [
  SignInStep,
  AvatarStep,
  CommunityDetailsStep,
  CommunitySettingsStep,
  AddMembersStep,
  MemberManagementStep,
  DashboardStep,
];

const WIZARD_STEPS: WizardStep[] = WIZARD_STEPS_CONFIG.map((step, index) => ({
  ...step,
  component: stepComponents[index],
}));

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({});
  const [isStepValid, setStepValidity] = useState(false);
  const [animationClass, setAnimationClass] = useState('animate-fade-in');
  const [attemptedStep, setAttemptedStep] = useState<number>(-1);

  const updateData = (fields: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const changeStep = (newStepIndex: number) => {
    setAnimationClass('animate-fade-out');
    setTimeout(() => {
      setCurrentStepIndex(newStepIndex);
      setAttemptedStep(-1); // Reset attempt state for the new step
      setAnimationClass('animate-fade-in');
    }, 300); // Match animation duration
  };

  const nextStep = () => {
    if (currentStepIndex < WIZARD_STEPS.length - 1) {
      changeStep(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      changeStep(currentStepIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (isStepValid) {
        nextStep();
    } else {
        setAttemptedStep(currentStepIndex);
    }
  };

  const currentStep = WIZARD_STEPS[currentStepIndex];
  const CurrentStepComponent = currentStep.component;
  const isLastStep = currentStepIndex === WIZARD_STEPS.length - 1;
  const progressPercentage = ((currentStepIndex + 1) / WIZARD_STEPS.length) * 100;
  const isAttempted = attemptedStep === currentStepIndex;

  const memoizedStepComponent = useMemo(() => {
    return <CurrentStepComponent 
                data={formData} 
                updateData={updateData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
                setStepValidity={setStepValidity}
                isAttempted={isAttempted} 
            />;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, formData, isAttempted]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl shadow-purple-900/20 rounded-2xl overflow-hidden min-h-[700px]">
        {/* Left Panel */}
        <div className="bg-gray-900 p-8 md:p-12 flex flex-col relative">
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex-grow flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white">{currentStep.title}</h1>
              <p className="text-gray-400 mt-2">{currentStep.description}</p>
            </div>
            
            <div className={`flex-grow ${animationClass}`}>
              {memoizedStepComponent}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          {!isLastStep && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="text-gray-400 font-semibold py-2 px-4 rounded-lg hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src={currentStep.image}
            alt={currentStep.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${animationClass}`}
            key={currentStep.image}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </main>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-fade-out { animation: fadeOut 0.3s ease-in forwards; }
      `}</style>
    </div>
  );
};

export default App;