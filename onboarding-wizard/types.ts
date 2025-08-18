import type React from 'react';

export interface OnboardingData {
  email?: string;
  password?: string;
  avatar?: File | null;
  communityName?: string;
  communityDescription?: string;
  communityPrivacy?: 'public' | 'private';
  members?: string;
  memberRoles?: { [key: string]: string };
}

export interface StepProps {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStepValidity: (isValid: boolean) => void;
  isAttempted?: boolean;
}

export interface WizardStep {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  component: React.ComponentType<StepProps>;
}