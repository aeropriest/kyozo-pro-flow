import React, { useState, useMemo, useEffect } from 'react';
import { WizardStep, WizardData } from '../../types/wizard';
import styles from './Wizard.module.scss';

interface WizardProps {
  steps: WizardStep[];
  initialData?: WizardData;
  onComplete?: (data: WizardData) => void;
  className?: string;
}

const Wizard: React.FC<WizardProps> = ({
  steps,
  initialData = {},
  onComplete,
  className = '',
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<WizardData>(initialData);
  const [isStepValid, setStepValidity] = useState(false);
  
  // Debug log for step validity changes
  useEffect(() => {
    console.log('Step validity changed:', isStepValid, 'for step:', currentStepIndex);
  }, [isStepValid, currentStepIndex]);
  const [animationClass, setAnimationClass] = useState(styles.fadeIn);
  const [attemptedStep, setAttemptedStep] = useState<number>(-1);

  const updateData = (fields: Partial<WizardData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const changeStep = (newStepIndex: number) => {
    console.log(`Changing step from ${currentStepIndex} to ${newStepIndex}`);
    setAnimationClass(styles.fadeOut);
    
    // Force immediate state update for debugging
    console.log('Setting animation class to fadeOut');
    
    setTimeout(() => {
      console.log(`Timeout executed, setting currentStepIndex to ${newStepIndex}`);
      setCurrentStepIndex(newStepIndex);
      setAttemptedStep(-1); // Reset attempt state for the new step
      setAnimationClass(styles.fadeIn);
      console.log('Setting animation class to fadeIn');
    }, 300); // Match animation duration
  };

  const nextStep = () => {
    console.log('nextStep called, current index:', currentStepIndex, 'total steps:', steps.length);
    if (currentStepIndex < steps.length - 1) {
      console.log('Moving to next step:', currentStepIndex + 1);
      changeStep(currentStepIndex + 1);
    } else if (onComplete) {
      console.log('Completing wizard with data:', formData);
      onComplete(formData);
    }
  };

  const prevStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('prevStep called, current index:', currentStepIndex);
    if (currentStepIndex > 0) {
      console.log('Moving to previous step:', currentStepIndex - 1);
      changeStep(currentStepIndex - 1);
    }
  };
  
  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Next button clicked');
    if (isStepValid) {
      console.log('Step is valid, proceeding to next step');
      nextStep();
    } else {
      console.log('Step is invalid, marking as attempted');
      setAttemptedStep(currentStepIndex);
    }
  };

  const currentStep = steps[currentStepIndex];
  const CurrentStepComponent = currentStep.component;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;
  const isAttempted = attemptedStep === currentStepIndex;

  const memoizedStepComponent = useMemo(() => {
    return <CurrentStepComponent 
      data={formData} 
      updateData={updateData} 
      nextStep={nextStep} 
      prevStep={prevStep} 
      setStepValidity={setStepValidity}
      isAttempted={isAttempted} 
    />;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, formData, isAttempted]);

  return (
    <div 
      className={`${styles.wizard} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        console.log('Wizard root clicked, preventing propagation');
      }}
    >
      <div 
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
          console.log('Wizard container clicked, preventing propagation');
        }}
      >
        {/* Left Panel */}
        <div 
          className={styles.contentPanel}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Content panel clicked, preventing propagation');
          }}
        >
          {/* Progress Indicator */}
          <div className={styles.progressContainer}>
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`${styles.progressBar} ${index === currentStepIndex ? styles.active : ''}`}
              />
            ))}
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.header}>
              <h2 className={styles.title}>{currentStep.title}</h2>
              <h3 className={styles.subtitle}>{currentStep.subtitle}</h3>
              <p className={styles.description}>{currentStep.description}</p>
            </div>
            
            <div 
              className={`${styles.stepContent} ${animationClass}`}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Step content clicked, preventing propagation');
              }}
            >
              {memoizedStepComponent}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className={styles.navigation} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={(e) => prevStep(e)}
              disabled={currentStepIndex === 0}
              className={`${styles.backButton} ${currentStepIndex === 0 ? styles.disabled : ''}`}
            >
              <span>&#8592;</span>
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Direct Next button click handler');
                handleNext(e);
              }}
              className={styles.nextButton}
            >
              <span>{isLastStep ? 'Complete' : 'Next'}</span>
              <span>&#8594;</span>
            </button>
          </div>
        </div>

        {/* Right Panel - Media (Image or Video) */}
        <div className={styles.rightPanel}>
          <div className={`${styles.mediaContainer} ${animationClass}`}>
            {currentStep.media?.type === 'video' && currentStep.media.url ? (
              <video 
                className={styles.stepVideo} 
                autoPlay 
                loop 
                muted
                playsInline
              >
                <source src={currentStep.media.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : currentStep.media?.type === 'image' && currentStep.media.url ? (
              <img
                src={currentStep.media.url}
                alt={currentStep.title || 'Step illustration'}
                className={styles.stepImage}
              />
            ) : currentStep.image ? (
              <img
                src={currentStep.image}
                alt={currentStep.title || 'Step illustration'}
                className={styles.stepImage}
              />
            ) : (
              <div 
                className={styles.mediaContainer}
                style={{ 
                  backgroundImage: 'linear-gradient(45deg, #4a4af4, #7b68ee)',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
