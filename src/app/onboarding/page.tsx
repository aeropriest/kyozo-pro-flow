'use client';

import React from 'react';
import OnboardingFlow from '../../components/onboarding/OnboardingFlow';

export default function OnboardingPage() {
  const handleComplete = () => {
    console.log('Onboarding completed!');
    // You can redirect to dashboard or another page here
  };

  return (
    <div className="min-h-screen">
      <OnboardingFlow onComplete={handleComplete} />
    </div>
  );
}
