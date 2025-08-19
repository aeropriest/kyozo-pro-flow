import React, { useState, useRef, ChangeEvent } from 'react';
import styles from './StepForm.module.scss';
import { Button, Input } from '@/components/ui';
import GenericStepWrapper from '../onboarding/GenericStepWrapper';
import { onboardingSteps } from '../onboarding/onboardingSteps';

interface AddMembersStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

interface Member {
  email: string;
  role: string;
  name?: string;
}

const AddMembersStep: React.FC<AddMembersStepProps> = ({
  onNext,
  onPrev,
  currentStep,
  totalSteps
}) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberName, setMemberName] = useState('');
  const [importError, setImportError] = useState('');
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Find the step data from onboardingSteps
  const stepData = onboardingSteps.find(step => step.component === 'AddMembersStep');

  // Handle input changes with error clearing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberRole(e.target.value);
    if (roleError) setRoleError('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberName(e.target.value);
  };

  // CSV Import handling
  const handleCSVImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error
    setImportError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const parsedMembers = parseCSV(csvData);
        
        if (parsedMembers.length > 0) {
          setMembers([...members, ...parsedMembers]);
        } else {
          setImportError('No valid members found in CSV file');
        }
      } catch (error) {
        setImportError('Error parsing CSV file. Please check the format.');
        console.error('CSV parsing error:', error);
      }
    };

    reader.onerror = () => {
      setImportError('Error reading file');
    };

    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Parse CSV data
  const parseCSV = (csvData: string): Member[] => {
    const lines = csvData.split('\n');
    const result: Member[] = [];
    
    // Check if there's a header row
    const firstLine = lines[0].toLowerCase();
    const hasHeader = firstLine.includes('email') || firstLine.includes('role') || firstLine.includes('name');
    
    // Start from index 1 if there's a header
    const startIndex = hasHeader ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',');
      
      // Basic validation - need at least email
      if (values[0] && /\S+@\S+\.\S+/.test(values[0].trim())) {
        result.push({
          email: values[0].trim(),
          role: values[1]?.trim() || 'Member',
          name: values[2]?.trim() || undefined
        });
      }
    }
    
    return result;
  };

  // Eventbrite import (mock function)
  const handleEventbriteImport = () => {
    // In a real implementation, this would open OAuth flow or API integration
    alert('Eventbrite integration would be implemented here');
    
    // Mock adding some sample Eventbrite attendees
    const mockEventbriteMembers: Member[] = [
      { email: 'attendee1@example.com', role: 'Member', name: 'Attendee One' },
      { email: 'attendee2@example.com', role: 'Member', name: 'Attendee Two' },
    ];
    
    setMembers([...members, ...mockEventbriteMembers]);
  };

  // Add a single member
  const handleAddMember = () => {
    if (validateSingleMember()) {
      const newMember: Member = {
        email: memberEmail,
        role: memberRole,
        name: memberName || undefined
      };
      
      setMembers([...members, newMember]);
      
      // Reset form
      setMemberEmail('');
      setMemberRole('');
      setMemberName('');
    }
  };

  // Remove a member
  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  // Validate single member form
  const validateSingleMember = () => {
    let isValid = true;
    
    // Reset errors
    setEmailError('');
    setRoleError('');
    
    // Validate email
    if (!memberEmail.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(memberEmail)) {
      setEmailError('Invalid email format');
      isValid = false;
    }
    
    // Validate role
    if (!memberRole.trim()) {
      setRoleError('Role is required');
      isValid = false;
    }
    
    return isValid;
  };

  // Validate form before proceeding
  const validateForm = () => {
    // Form is valid if there's at least one member
    return members.length > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Members:', members);
      onNext?.();
    } else {
      setImportError('Please add at least one member before proceeding');
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
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Import Members</h3>
          
          <div className={styles.importOptions}>
            <Button 
              variant="outline-only" 
              size="medium" 
              onClick={handleCSVImport}
              fullWidth
            >
              Import from CSV
            </Button>
            <Button 
              variant="outline-only" 
              size="medium" 
              onClick={handleEventbriteImport}
              fullWidth
            >
              Import from Eventbrite
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".csv"
              style={{ display: 'none' }} 
            />
          </div>
          
          {importError && <div className={styles.errorMessage}>{importError}</div>}
        </div>
        
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Add Member Manually</h3>
          
          <div className={styles.formGroup}>
            <Input
              type="email"
              id="memberEmail"
              name="memberEmail"
              value={memberEmail}
              onChange={handleEmailChange}
              placeholder="Member Email"
              error={emailError}
            />
          </div>
          
          <div className={styles.formGroup}>
            <Input
              type="text"
              id="memberName"
              name="memberName"
              value={memberName}
              onChange={handleNameChange}
              placeholder="Member Name (Optional)"
            />
          </div>
          
          <div className={styles.formGroup}>
            <Input
              type="text"
              id="memberRole"
              name="memberRole"
              value={memberRole}
              onChange={handleRoleChange}
              placeholder="Member Role"
              error={roleError}
            />
          </div>
          
          <Button 
            variant="outline-only" 
            size="medium" 
            onClick={handleAddMember}
            fullWidth={false}
            className={styles.addButton}
          >
            Add Member
          </Button>
        </div>
        
        {members.length > 0 && (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Added Members ({members.length})</h3>
            
            <div className={styles.membersList}>
              {members.map((member, index) => (
                <div key={index} className={styles.memberItem}>
                  <div className={styles.memberInfo}>
                    <div className={styles.memberEmail}>{member.email}</div>
                    <div className={styles.memberDetails}>
                      {member.name && <span>{member.name} • </span>}
                      <span>{member.role}</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveMember(index)}
                    aria-label="Remove member"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
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
            onClick={() => {
              const event = new Event('submit') as unknown as React.FormEvent;
              handleSubmit(event);
            }}
            fullWidth
          >
            Next
          </Button>
        </div>
      </form>
    </GenericStepWrapper>
  );
};

export default AddMembersStep;
