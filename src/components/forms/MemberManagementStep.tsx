import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';

interface MemberManagementStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
  description?: string;
}

const MemberManagementStep: React.FC<MemberManagementStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps,
  description
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Member management:', { searchQuery, filterOption });
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
      <h2 className={styles.cardTitle}>Member Management</h2>
      {description && <p className={styles.cardDescription}>{description}</p>}
      
      <div className={styles.formControls}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="searchQuery"
                name="searchQuery"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                placeholder="Search Members"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="filterOption"
                name="filterOption"
                value={filterOption}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterOption(e.target.value)}
                placeholder="Filter By Role"
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

export default MemberManagementStep;
