import React, { useState } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

interface MemberManagementStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

const MemberManagementStep: React.FC<MemberManagementStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');
  
  // Error states
  const [searchError, setSearchError] = useState('');
  const [filterError, setFilterError] = useState('');
  
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'MemberManagementStep');

  // Handle input changes with error clearing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (searchError) setSearchError('');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOption(e.target.value);
    if (filterError) setFilterError('');
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setSearchError('');
    setFilterError('');
    
    // Validate search query
    if (!searchQuery.trim()) {
      setSearchError('Search query is required');
      isValid = false;
    }
    
    // Validate filter option
    if (!filterOption.trim()) {
      setFilterError('Filter option is required');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Member management:', { searchQuery, filterOption });
      onNext?.();
    }
  };

  return (
    <GenericStepWrapper
      step={stepData!}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="searchQuery"
                name="searchQuery"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Members"
                error={searchError}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                type="text"
                id="filterOption"
                name="filterOption"
                value={filterOption}
                onChange={handleFilterChange}
                placeholder="Filter By Role"
                error={filterError}
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
    </GenericStepWrapper>
  );
};

export default MemberManagementStep;
