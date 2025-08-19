'use client';

import React, { useState } from 'react';
import Dialog from '@/components/Dialog';
import { Button } from '@/components/ui';

const OnboardingTestPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Onboarding Flow Test</h1>
        <p className="mb-6 text-gray-600">
          Click the button below to test the new onboarding flow in a dialog.
        </p>
        <Button 
          variant="primary" 
          onClick={() => setIsDialogOpen(true)}
          className="px-6 py-3 text-lg"
        >
          Start Onboarding
        </Button>
      </div>

      <Dialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default OnboardingTestPage;
