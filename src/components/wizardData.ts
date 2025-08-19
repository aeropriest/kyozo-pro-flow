// wizardData.ts - Centralized data for wizard steps
import { ReactNode } from 'react';

export interface WizardStep {
  title: string;
  description: string;
  image: string;
  component: string;
  customComponent?: ReactNode | null;
}

// Consolidated wizard steps based on user requirements
export const cards: WizardStep[] = [
  {
    title: "Welcome to Kyozo",
    description: "Create an account or sign in to access your community dashboard and settings.",
    image: "/form-right.mp4",
    component: 'SignInStep',
    customComponent: null
  },
  {
    title: "Its About You",
    description: "Add your details and select a profile image that represents you. This will be visible to other members of your community.",
    image: "/Parallax4.jpg",
    component: 'ProfileForm',
    customComponent: null,
  },
  {
    title: "Create Your Community",
    description: "Provide details about your community and customize its settings, including privacy options and theme colors.",
    image: "/Parallax5.jpg",
    component: 'CommunityDetailsStep',
    customComponent: null,
  },
  {
    title: "Add Members",
    description: "Invite members to your community by email, CSV import, or Eventbrite integration.",
    image: "/Parallax2.jpg",
    component: 'AddMembersStep',
    customComponent: null,
  },
  {
    title: "Ready to Launch",
    description: "Review your community setup and make any final adjustments before launching.",
    image: "/Parallax1.jpg",
    component: 'DashboardStep',
    customComponent: null,
  }
];

// Export the same data as onboardingSteps for backward compatibility
// This will help during the transition period
export const onboardingSteps = cards.map(card => ({
  title: card.title,
  description: card.description,
  image: card.image,
  component: card.component
}));
