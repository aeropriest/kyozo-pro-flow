import React from 'react';
import Wizard from './Wizard';
import { WizardStep } from '../../types/wizard';
import { 
  UserInfoStep, 
  AccountSetupStep, 
  PreferencesStep, 
  CompletionStep 
} from './WizardSteps';

// Define your wizard steps configuration
const WIZARD_STEPS_CONFIG: Omit<WizardStep, 'component'>[] = [
  {
    title: "User Information",
    subtitle: "Tell us about yourself",
    description: "Please provide your basic information to get started with your account setup.",
    image: "https://picsum.photos/seed/user/800/1200",
  },
  {
    title: "Account Setup",
    subtitle: "Secure your account",
    description: "Create a strong password to protect your account and ensure your data remains secure.",
    image: "https://picsum.photos/seed/account/800/1200",
  },
  {
    title: "Preferences",
    subtitle: "Customize your experience",
    description: "Tell us more about yourself so we can personalize your experience on our platform.",
    image: "https://picsum.photos/seed/preferences/800/1200",
  },
  {
    title: "All Set!",
    subtitle: "Your account is ready",
    description: "Congratulations! You've successfully completed the setup process and your account is now ready to use.",
    image: "https://picsum.photos/seed/complete/800/1200",
  },
];

// Map step components to configuration
const stepComponents = [
  UserInfoStep,
  AccountSetupStep,
  PreferencesStep,
  CompletionStep,
];

// Create the final wizard steps array
const WIZARD_STEPS: WizardStep[] = WIZARD_STEPS_CONFIG.map((step, index) => ({
  ...step,
  component: stepComponents[index],
}));

const WizardExample: React.FC = () => {
  const handleComplete = (data: any) => {
    console.log('Wizard completed with data:', data);
    // You can handle form submission or navigation here
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Wizard 
        steps={WIZARD_STEPS} 
        onComplete={handleComplete}
      />
    </div>
  );
};

export default WizardExample;
