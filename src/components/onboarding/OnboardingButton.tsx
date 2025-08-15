'use client';

import React, { useState } from 'react';
import styles from './OnboardingButton.module.scss';
import OnboardingWizard from './OnboardingWizard';

const OnboardingButton: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const openWizard = () => {
    setIsWizardOpen(true);
  };

  const closeWizard = () => {
    setIsWizardOpen(false);
  };

  return (
    <>
      <button 
        className={styles.onboardingButton}
        onClick={openWizard}
      >
        Start Onboarding
      </button>
      <OnboardingWizard 
        isOpen={isWizardOpen} 
        onClose={closeWizard} 
      />
    </>
  );
};

export default OnboardingButton;
