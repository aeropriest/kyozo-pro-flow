import { useEffect } from 'react';
import { WizardData } from '../types/wizard';

/**
 * A hook to validate form fields and update step validity
 * 
 * @param data The form data object
 * @param fields Array of field names to validate
 * @param setStepValidity Function to update step validity state
 */
export const useFormValidation = (
  data: WizardData,
  fields: string[],
  setStepValidity: (isValid: boolean) => void
) => {
  useEffect(() => {
    const isValid = fields.every(field => {
      const value = data[field];
      if (typeof value === 'string') return value.trim() !== '';
      if (value === null || value === undefined) return false;
      return true;
    });
    setStepValidity(isValid);
  }, [data, fields, setStepValidity]);
};

/**
 * Validates a field based on its name and value
 * 
 * @param name Field name
 * @param value Field value
 * @returns Error message or empty string if valid
 */
export const validateField = (name: string, value: string): string => {
  if (!value) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
  
  switch (name) {
    case 'email':
      return !/\S+@\S+\.\S+/.test(value) ? 'Email address is invalid.' : '';
    case 'password':
      return value.length < 8 ? 'Password must be at least 8 characters.' : '';
    default:
      return '';
  }
};
