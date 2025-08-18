import React from 'react';

export interface WizardData {
  [key: string]: any;
}

export interface WizardStep {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  component: React.FC<StepProps>;
}

export interface StepProps {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStepValidity: (isValid: boolean) => void;
  isAttempted: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}
