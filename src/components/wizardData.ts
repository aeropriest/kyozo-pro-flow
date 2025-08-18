// wizardData.ts - Centralized data for wizard steps

export const cards = [
  {
    title: "Sign In / Sign Up",
    subtitle: "Welcome to Kyozo Pro",
    description: "Create an account or sign in to access your community dashboard and settings.",
    image: "/form-right.mp4",
    component: 'SignInStep',
    customComponent: null
  },
  {
    title: "Avatar Setup",
    subtitle: "Choose your profile picture.",
    description: "Select or upload an image that represents you. This will be visible to other members of your community.",
    image: "/Parallax4.jpg",
    component: 'ProfileForm',
    customComponent: null,
  },
  {
    title: "Create Your Community",
    subtitle: "Tell us about your community.",
    description: "Provide details about your community's purpose, goals, and target audience to help us customize your experience.",
    image: "/Parallax4.jpg",
    component: 'CommunityDetailsStep',
    customComponent: null,
  },
  {
    title: "Community Settings",
    subtitle: "Customize your community's rules and appearance.",
    description: "Set up guidelines, privacy options, and visual elements to create a unique identity for your community.",
    image: "/Parallax5.jpg",
    component: 'CommunitySettingsStep',
    customComponent: null,
  },
  {
    title: "Add Members",
    subtitle: "Invite people to join your community.",
    description: "Add members to your community and assign roles to help manage your community effectively.",
    image: "/Parallax6.jpg",
    component: 'AddMembersStep',
    customComponent: null,
  },
  {
    title: "Member Management",
    subtitle: "Manage your community members.",
    description: "Review and manage your community members, assign roles, and set permissions.",
    image: "/Parallax7.jpg",
    component: 'MemberManagementStep',
    customComponent: null,
  },
  {
    title: "Dashboard",
    subtitle: "Your community dashboard.",
    description: "View and manage your community's activity, members, and settings.",
    image: "/Parallax8.jpg",
    component: 'DashboardStep',
    customComponent: null,
  }
];
