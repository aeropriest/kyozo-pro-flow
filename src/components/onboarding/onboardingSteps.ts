import { ReactNode } from 'react';

export interface OnboardingStep {
  title: string;
  subtitle: string;
  image: string;
  component: string;
  description?: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    title: "Create Your Account",
    subtitle: "Sign up with your email or connect with Google.",
    image: "/Parallax2.jpg",
    component: 'SignupStep',
    description: "Create your account to get started with our platform."
  },
  {
    title: "Set Your Avatar now",
    subtitle: "Give your profile a personal touch.",
    image: "/Parallax3.jpg",
    component: 'AvatarStep',
    description: "Upload a profile picture or choose from our avatar options."
  },
  {
    title: "Create Your Community",
    subtitle: "Tell us about your community.",
    image: "/Parallax4.jpg",
    component: 'CommunityDetailsStep',
    description: "Set up your community with a name and description."
  },
  {
    title: "Community Settings",
    subtitle: "Configure your community settings.",
    image: "/Parallax5.jpg",
    component: 'CommunitySettingsStep',
    description: "Configure privacy settings and other preferences for your community."
  },
  {
    title: "Add Members",
    subtitle: "Invite people to join your community.",
    image: "/Parallax6.jpg",
    component: 'AddMembersStep',
    description: "Invite members to join your community via email or share a link."
  },
  {
    title: "Member Management",
    subtitle: "Set roles and permissions for your members.",
    image: "/Parallax7.jpg",
    component: 'MemberManagementStep',
    description: "Assign roles and set permissions for community members."
  },
  {
    title: "Dashboard",
    subtitle: "Your community is ready to go!",
    image: "/Parallax8.jpg",
    component: 'DashboardStep',
    description: "Your community is now set up and ready to use."
  },
];
