import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';

interface CommunityDetailsStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
  description?: string;
}

const CommunityDetailsStep: React.FC<CommunityDetailsStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps,
  description
}) => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Community details:', { communityName, communityDescription });
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>Create Your Community</h2>
      {description && <p className={styles.cardDescription}>{description}</p>}
        
      <div className={styles.formControls}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="communityName"
                name="communityName"
                value={communityName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommunityName(e.target.value)}
                placeholder="Community Name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="communityDescription"
                name="communityDescription"
                value={communityDescription}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommunityDescription(e.target.value)}
                placeholder="Community Description"
                required
              />
            </div>
            
            <div className={styles.actionRow}>
              <Button 
                variant="outline-only" 
                size="medium" 
                onClick={onPrev}
                fullWidth
              >
                Back
              </Button>
              <Button 
                variant="outline-only" 
                size="medium" 
                type="submit"
                fullWidth
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailsStep;
