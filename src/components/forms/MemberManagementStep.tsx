import React, { useState } from 'react';
import styles from './CustomForm.module.scss';
import { Input } from '@/components/ui';
import CustomForm from './CustomForm';
import { cards } from '../wizardData';

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
  
  // Find the step data from cards
  const stepIndex = cards.findIndex(step => step.component === 'MemberManagementStep');

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
    <CustomForm
      stepIndex={stepIndex}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
      onSubmit={handleSubmit}
    >
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
    </CustomForm>
  );
};

export default MemberManagementStep;
