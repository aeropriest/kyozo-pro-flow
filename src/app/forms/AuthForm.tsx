'use client';

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Input, Checkbox } from '@/components/ui';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
  fields: {
    name: string;
    type: string;
    placeholder: string;
    label?: string | React.ReactNode;
  }[];
  initialValues: Record<string, any>;
  onSubmit: (data: any) => void;
  validate: (values: any) => Partial<Record<string, string>>;
  extraContent?: React.ReactNode; // terms checkbox or forgotten password link
  submitText: string;
  googleText: string;
  onGoogleClick?: () => void;
}

interface AuthFormHandle {
  submitForm: () => void;
}

const AuthForm = forwardRef<AuthFormHandle, AuthFormProps>((props, ref) => {
  const { 
    fields, 
    initialValues, 
    onSubmit, 
    validate, 
    submitText, 
    googleText, 
    onGoogleClick, 
    extraContent 
  } = props;
  
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prev: Record<string, any>) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev: Record<string, string>) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors as Record<string, string>);
      return;
    }
    onSubmit(values);
  };
  
  // Expose submitForm method to parent components
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length) {
        setErrors(validationErrors as Record<string, string>);
        return;
      }
      onSubmit(values);
    }
  }));

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.authForm}>
      {fields.map(f => (
        <div key={f.name} className={styles.formGroup}>
          {f.type !== 'checkbox' ? (
            <Input
              type={f.type}
              name={f.name}
              value={values[f.name] || ''}
              placeholder={f.placeholder}
              onChange={handleChange}
              error={errors[f.name]}
              required
            />
          ) : (
            <Checkbox
              id={`checkbox-${f.name}`}
              name={f.name}
              checked={values[f.name]}
              onChange={handleChange}
              label={f.label}
            />
          )}
          {errors[f.name] && (
            <div className={styles.errorMessage}>{errors[f.name]}</div>
          )}
        </div>
      ))}

      {extraContent}

      <div className={styles.actionRow}>
        {submitText && (
          <Button type="submit" fullWidth variant="outline-only">
            {submitText}
          </Button>
        )}
        {googleText && onGoogleClick && (
          <Button
            type="button"
            fullWidth
            variant="outline-only"
            onClick={onGoogleClick}
          >
            {googleText}
          </Button>
        )}
      </div>
    </form>
  );
});

export default AuthForm;
