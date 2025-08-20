'use client';
import React from 'react';
import UnifiedCard from './UnifiedCard';

interface DialogCardProps {
  title: string;
  subtitle: string;
  text: string;
  description?: string;
  button: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  customComponent?: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  content?: React.ReactNode;
  backgroundColor?: string;
}

const DialogCard: React.FC<DialogCardProps> = ({ 
  title, 
  subtitle, 
  text, 
  description = '',
  button, 
  content, 
  className = '',
  customComponent,
  currentStep = 1,
  totalSteps = 6,
  style,
  backgroundColor
}) => {
  return (
    <UnifiedCard
      title={title}
      subtitle={subtitle}
      text={text}
      description={description}
      button={button}
      content={content}
      customComponent={customComponent}
      className={className}
      style={style}
      backgroundColor={backgroundColor}
      currentStep={currentStep}
      totalSteps={totalSteps}
      showStepIndicator={!customComponent}
      variant="dialog"
    />
  );
};

export default DialogCard;
